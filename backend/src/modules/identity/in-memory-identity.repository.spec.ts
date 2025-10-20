import { InMemoryIdentityRepository } from './in-memory-identity.repository';
import { IdentityInvitation, IdentityUser } from './identity.types';

const createUser = (overrides: Partial<IdentityUser> = {}): IdentityUser => ({
  id: overrides.id ?? 'user-1',
  email: overrides.email ?? 'user@example.com',
  displayName: overrides.displayName ?? 'User',
  passwordHash: overrides.passwordHash ?? 'hash',
  createdAt: overrides.createdAt ?? new Date('2023-01-01T00:00:00Z'),
  updatedAt: overrides.updatedAt ?? new Date('2023-01-01T00:00:00Z'),
});

const createInvitation = (overrides: Partial<IdentityInvitation> = {}): IdentityInvitation => ({
  id: overrides.id ?? 'invite-1',
  email: overrides.email ?? 'invite@example.com',
  code: overrides.code ?? 'code-1',
  createdAt: overrides.createdAt ?? new Date('2023-01-01T00:00:00Z'),
  expiresAt: overrides.expiresAt ?? null,
});

describe('InMemoryIdentityRepository', () => {
  let repository: InMemoryIdentityRepository;

  beforeEach(() => {
    repository = new InMemoryIdentityRepository();
  });

  it('stores and retrieves users by id and email', async () => {
    const user = createUser();

    await repository.saveUser(user);

    await expect(repository.findUserById(user.id)).resolves.toEqual(user);
    await expect(repository.findUserByEmail(user.email)).resolves.toEqual(user);
  });

  it('stores and retrieves invitations', async () => {
    const invitation = createInvitation();

    await repository.saveInvitation(invitation);

    await expect(repository.findInvitationById(invitation.id)).resolves.toEqual(invitation);
    await expect(repository.findInvitationByEmail(invitation.email)).resolves.toEqual(invitation);
  });

  it('deletes invitations', async () => {
    const invitation = createInvitation();

    await repository.saveInvitation(invitation);
    await repository.deleteInvitation(invitation.id);

    await expect(repository.findInvitationById(invitation.id)).resolves.toBeNull();
  });
});
