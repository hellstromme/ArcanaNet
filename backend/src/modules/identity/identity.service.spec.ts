import { Test } from '@nestjs/testing';
import { IdentityService } from './identity.service';
import { IDENTITY_REPOSITORY } from './identity.constants';
import { IdentityRepository } from './identity.repository';
import { IdentityInvitation, IdentityUser } from './identity.types';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/create-user.dto';

class IdentityRepositoryStub implements IdentityRepository {
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

describe('IdentityService', () => {
  let service: IdentityService;
  let repository: IdentityRepositoryStub;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IdentityService,
        {
          provide: IDENTITY_REPOSITORY,
          useClass: IdentityRepositoryStub,
        },
      ],
    }).compile();

    service = moduleRef.get(IdentityService);
    repository = moduleRef.get(IDENTITY_REPOSITORY);
  });

  it('registers a user when no existing account is found', async () => {
    const payload: CreateUserDto = {
      email: 'Test@Example.com',
      password: 'super-secret',
      displayName: 'Test User',
    };

    const created = await service.registerUser(payload);

    expect(created.email).toBe('test@example.com');
    expect(created.displayName).toBe('Test User');
    expect(created.passwordHash).not.toEqual(payload.password);

    const stored = await repository.findUserById(created.id);
    expect(stored).toEqual(created);
  });

  it('throws when attempting to register with an existing email', async () => {
    const payload: CreateUserDto = {
      email: 'duplicate@example.com',
      password: 'password123',
    };

    await service.registerUser(payload);

    await expect(service.registerUser(payload)).rejects.toBeInstanceOf(ConflictException);
  });

  it('creates invitations for users without accounts', async () => {
    const invitation = await service.createInvitation('invitee@example.com');

    expect(invitation.email).toBe('invitee@example.com');
    expect(invitation.code).toBeDefined();

    const stored = await repository.findInvitationById(invitation.id);
    expect(stored).toEqual(invitation);
  });

  it('throws when creating an invitation for an existing user', async () => {
    await service.registerUser({
      email: 'existing@example.com',
      password: 'password123',
    });

    await expect(service.createInvitation('existing@example.com')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('throws when an invitation already exists for the email', async () => {
    await service.createInvitation('duplicate-invite@example.com');

    await expect(service.createInvitation('duplicate-invite@example.com')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('revokes invitations', async () => {
    const invitation = await service.createInvitation('revoke@example.com');

    await service.revokeInvitation(invitation.id);

    const stored = await repository.findInvitationById(invitation.id);
    expect(stored).toBeNull();
  });
});
