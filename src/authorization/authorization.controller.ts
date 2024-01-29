import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { RoleGuard } from './role.guard';

@UseGuards(RoleGuard)
@Roles(Role.Admin)
@Controller('authorization')
export class AuthorizationController {
  @Get('player-list')
  getPlayerList() {
    return ['kyrie', 'lebron', 'durant', 'wade'];
  }
}
