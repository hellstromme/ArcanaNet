import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IDENTITY_REPOSITORY } from './identity.constants';
import { InMemoryIdentityRepository } from './in-memory-identity.repository';

@Module({
  providers: [
    IdentityService,
    {
      provide: IDENTITY_REPOSITORY,
      useClass: InMemoryIdentityRepository,
    },
  ],
  exports: [IdentityService, IDENTITY_REPOSITORY],
})
export class IdentityModule {}
