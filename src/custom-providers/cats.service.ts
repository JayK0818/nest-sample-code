import { Injectable } from '@nestjs/common';
// import type { PlayerObject } from './no-class-object';

@Injectable()
export class CustomProviderCatService {
  getPlayerList() {
    return ['a', 'b'];
  }
  getTeamList() {
    return ['a1111'];
  }
}
