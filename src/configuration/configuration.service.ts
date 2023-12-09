import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}
  getVariableList() {
    // console.log(this.configService.get('database.port', '我是默认port'));
    // console.log(this.configService.get('message'));
    console.log(this.configService.get('database'));
    console.log(this.configService.get('user'));
    const user = this.configService.get<string>('USERNAME');
    console.log('user', user);
    return user;
    // return this.configService.get<string>('DATABASE_USER');
  }
}
