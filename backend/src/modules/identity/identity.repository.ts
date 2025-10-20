import { IdentityInvitation, IdentityUser } from './identity.types';

export interface IdentityRepository {
  findUserById(id: string): Promise<IdentityUser | null>;
  findUserByEmail(email: string): Promise<IdentityUser | null>;
  saveUser(user: IdentityUser): Promise<IdentityUser>;

  findInvitationById(id: string): Promise<IdentityInvitation | null>;
  findInvitationByEmail(email: string): Promise<IdentityInvitation | null>;
  saveInvitation(invitation: IdentityInvitation): Promise<IdentityInvitation>;
  deleteInvitation(id: string): Promise<void>;
}
