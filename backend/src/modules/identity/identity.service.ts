import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createHash } from 'crypto';
import { IdentityRepository } from './identity.repository';
import { IdentityInvitation, IdentityUser } from './identity.types';
import { IDENTITY_REPOSITORY } from './identity.constants';
import { CreateUserDto } from '../../common/dto/create-user.dto';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(IDENTITY_REPOSITORY)
    private readonly repository: IdentityRepository,
  ) {}

  async getUserById(id: string): Promise<IdentityUser | null> {
    return this.repository.findUserById(id);
  }

  async getUserByEmail(email: string): Promise<IdentityUser | null> {
    return this.repository.findUserByEmail(email.toLowerCase());
  }

  async registerUser(payload: CreateUserDto): Promise<IdentityUser> {
    const normalizedEmail = payload.email.toLowerCase();
    const existingUser = await this.repository.findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictException(`User with email ${normalizedEmail} already exists.`);
    }

    const now = new Date();
    const user: IdentityUser = {
      id: uuid(),
      email: normalizedEmail,
      displayName: payload.displayName ?? normalizedEmail,
      passwordHash: this.hashPassword(payload.password),
      createdAt: now,
      updatedAt: now,
    };

    return this.repository.saveUser(user);
  }

  async createInvitation(email: string, expiresAt?: Date | null): Promise<IdentityInvitation> {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await this.repository.findUserByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictException(`User with email ${normalizedEmail} already exists.`);
    }

    const existingInvitation = await this.repository.findInvitationByEmail(normalizedEmail);
    if (existingInvitation) {
      throw new ConflictException(`Invitation for ${normalizedEmail} already exists.`);
    }

    const invitation: IdentityInvitation = {
      id: uuid(),
      email: normalizedEmail,
      code: uuid(),
      createdAt: new Date(),
      expiresAt: expiresAt ?? null,
    };

    return this.repository.saveInvitation(invitation);
  }

  async getInvitationById(id: string): Promise<IdentityInvitation | null> {
    return this.repository.findInvitationById(id);
  }

  async revokeInvitation(id: string): Promise<void> {
    await this.repository.deleteInvitation(id);
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
}
