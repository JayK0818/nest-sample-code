import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';
@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}
  @Get('list')
  getDatabaseList() {
    return ['mysql', 'mongodb'];
  }
  @Post('create-player')
  handeCreatePlayer(@Body() data) {
    console.log('data:', data);
    return this.databaseService.create(data);
  }
  @Post('create-account')
  handleCreateAccount(@Body() data) {
    return this.databaseService.createAccount(data);
  }
}
