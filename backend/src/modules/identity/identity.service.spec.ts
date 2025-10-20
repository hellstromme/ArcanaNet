import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IdentityService } from './identity.service';

describe('IdentityService', () => {
  let service: IdentityService;

  beforeEach(() => {
    service = new IdentityService();
  });

  describe('bootstrapAdmin', () => {
    it('creates the first admin with normalized email', () => {
      const result = service.bootstrapAdmin({
        email: 'Admin@Example.Com',
        displayName: 'Admin One',
      });

      expect(result.user.role).toBe('admin');
      expect(result.user.email).toBe('admin@example.com');
      expect(service.listAdmins()).toHaveLength(1);
    });

    it('throws when an admin already exists', () => {
      service.bootstrapAdmin({ email: 'admin@example.com', displayName: 'Admin' });

      expect(() =>
        service.bootstrapAdmin({
          email: 'second@example.com',
          displayName: 'Admin Two',
        }),
      ).toThrow(ConflictException);
    });
  });

  describe('inviteStandardUser', () => {
    const adminEmail = 'admin@example.com';

    function createAdmin() {
      const { user } = service.bootstrapAdmin({
        email: adminEmail,
        displayName: 'Admin',
      });
      return user.id;
    }

    it('throws when admin user is missing', () => {
      expect(() =>
        service.inviteStandardUser('missing-admin', {
          email: 'user@example.com',
        }),
      ).toThrow(NotFoundException);
    });

    it('throws when inviter is not an admin', () => {
      const { user: admin } = service.bootstrapAdmin({
        email: adminEmail,
        displayName: 'Admin',
      });

      const { invitation } = service.inviteStandardUser(admin.id, {
        email: 'user@example.com',
      });

      // simulate a standard user accepting an invitation by creating a user entry
      // this bypasses the service API but reflects the state that would exist once accepted
      (service as any).users.set('standard-user', {
        id: 'standard-user',
        email: invitation.email,
        displayName: 'Standard User',
        role: 'standard',
        invitedBy: admin.id,
        createdAt: new Date(),
      });

      expect(() =>
        service.inviteStandardUser('standard-user', {
          email: 'second@example.com',
        }),
      ).toThrow(ForbiddenException);
    });

    it('prevents invitations when a user already exists with the email', () => {
      const adminId = createAdmin();

      expect(() =>
        service.inviteStandardUser(adminId, {
          email: adminEmail,
        }),
      ).toThrow(ConflictException);
    });

    it('prevents duplicate invitations for the same email', () => {
      const adminId = createAdmin();

      service.inviteStandardUser(adminId, {
        email: 'user@example.com',
      });

      expect(() =>
        service.inviteStandardUser(adminId, {
          email: 'user@example.com',
        }),
      ).toThrow(ConflictException);
    });

    it('creates an invitation with normalized email and metadata', () => {
      const adminId = createAdmin();

      const result = service.inviteStandardUser(adminId, {
        email: 'User@Example.Com',
      });

      expect(result.invitation.email).toBe('user@example.com');
      expect(result.invitation.invitedBy).toBe(adminId);
      expect(service.listInvitations()).toHaveLength(1);
    });
  });
});
