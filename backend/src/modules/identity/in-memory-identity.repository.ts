import { Injectable } from '@nestjs/common';
import { IdentityRepository } from './identity.repository';
import { IdentityInvitation, IdentityUser } from './identity.types';

@Injectable()
export class InMemoryIdentityRepository implements IdentityRepository {
  private readonly users = new Map<string, IdentityUser>();
  private readonly invitations = new Map<string, IdentityInvitation>();

  async findUserById(id: string): Promise<IdentityUser | null> {
    return this.users.get(id) ?? null;
  }

  async findUserByEmail(email: string): Promise<IdentityUser | null> {
    const normalizedEmail = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  async saveUser(user: IdentityUser): Promise<IdentityUser> {
    this.users.set(user.id, user);
    return user;
  }

  async findInvitationById(id: string): Promise<IdentityInvitation | null> {
    return this.invitations.get(id) ?? null;
  }

  async findInvitationByEmail(email: string): Promise<IdentityInvitation | null> {
    const normalizedEmail = email.toLowerCase();
    for (const invitation of this.invitations.values()) {
      if (invitation.email === normalizedEmail) {
        return invitation;
      }
    }
    return null;
  }

  async saveInvitation(invitation: IdentityInvitation): Promise<IdentityInvitation> {
    this.invitations.set(invitation.id, invitation);
    return invitation;
  }

  async deleteInvitation(id: string): Promise<void> {
    this.invitations.delete(id);
  }
}
