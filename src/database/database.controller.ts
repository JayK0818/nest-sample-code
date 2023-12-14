import { Controller, Get } from '@nestjs/common';

@Controller('database')
export class DatabaseController {
  @Get('list')
  getDatabaseList() {
    return ['mysql', 'mongodb'];
  }
}
