import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';
import { InviteStandardUserDto } from './dto/invite-standard-user.dto';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('admin/bootstrap')
  bootstrapAdmin(@Body() dto: BootstrapAdminDto) {
    return this.identityService.bootstrapAdmin(dto);
  }

  @Post('admin/:adminId/invitations')
  inviteStandardUser(@Param('adminId') adminId: string, @Body() dto: InviteStandardUserDto) {
    return this.identityService.inviteStandardUser(adminId, dto);
  }

  @Get('admin')
  listAdmins() {
    return this.identityService.listAdmins();
  }

  @Get('invitations')
  listInvitations() {
    return this.identityService.listInvitations();
  }
}
