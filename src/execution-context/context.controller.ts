import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { ExecutionGuard } from './guard';
import { Roles } from './role.decorator';

@Roles(['admin'])
@Controller('execution-context')
export class ExecutionContextController {
  @UseGuards(ExecutionGuard)
  @Get('player-list')
  // @Roles(['user'])
  @SetMetadata('roles', ['admin123'])
  getPlayerList() {
    return ['hello', 'world'];
  }
}
