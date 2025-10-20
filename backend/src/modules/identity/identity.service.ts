import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';
import { InviteStandardUserDto } from './dto/invite-standard-user.dto';

type IdentityUserRole = 'admin' | 'standard';

interface IdentityUser {
  id: string;
  email: string;
  displayName?: string;
  role: IdentityUserRole;
  invitedBy?: string;
  createdAt: Date;
}

interface Invitation {
  token: string;
  email: string;
  role: Exclude<IdentityUserRole, 'admin'>;
  invitedBy: string;
  createdAt: Date;
}

@Injectable()
export class IdentityService {
  private readonly users = new Map<string, IdentityUser>();
  private readonly invitations = new Map<string, Invitation>();

  bootstrapAdmin(dto: BootstrapAdminDto) {
    if (this.hasAnyAdmins()) {
      throw new ConflictException('An admin user has already been configured.');
    }

    const adminUser: IdentityUser = {
      id: randomUUID(),
      email: dto.email.toLowerCase(),
      displayName: dto.displayName,
      role: 'admin',
      createdAt: new Date(),
    };

    this.users.set(adminUser.id, adminUser);

    return {
      message: 'Initial admin account created.',
      user: adminUser,
    };
  }

  inviteStandardUser(adminId: string, dto: InviteStandardUserDto) {
    const adminUser = this.users.get(adminId);

    if (!adminUser) {
      throw new NotFoundException('Admin user not found.');
    }

    if (adminUser.role !== 'admin') {
      throw new ForbiddenException('Only admin users can send invitations.');
    }

    const normalizedEmail = dto.email.toLowerCase();

    if (this.findUserByEmail(normalizedEmail)) {
      throw new ConflictException('A user with this email already exists.');
    }

    if (this.findInvitationByEmail(normalizedEmail)) {
      throw new ConflictException('An invitation for this email has already been issued.');
    }

    const invitation: Invitation = {
      token: randomUUID(),
      email: normalizedEmail,
      role: 'standard',
      invitedBy: adminUser.id,
      createdAt: new Date(),
    };

    this.invitations.set(invitation.token, invitation);

    return {
      message: 'Invitation created.',
      invitation,
    };
  }

  listAdmins() {
    return Array.from(this.users.values()).filter((user) => user.role === 'admin');
  }

  listInvitations() {
    return Array.from(this.invitations.values());
  }

  private hasAnyAdmins() {
    return Array.from(this.users.values()).some((user) => user.role === 'admin');
  }

  private findUserByEmail(email: string) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  private findInvitationByEmail(email: string) {
    return Array.from(this.invitations.values()).find((invitation) => invitation.email === email);
  }
}
