export interface IdentityUser {
  id: string;
  email: string;
  displayName?: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdentityInvitation {
  id: string;
  email: string;
  code: string;
  createdAt: Date;
  expiresAt?: Date | null;
}
