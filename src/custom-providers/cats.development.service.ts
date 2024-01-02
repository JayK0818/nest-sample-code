import { Injectable } from '@nestjs/common';

@Injectable()
export class DevelopmentCatService {
  getPlayerList() {
    return ['kyrie irving', 'kevin durant'];
  }
  getTeamList() {
    return ['aaaaa11', 'bbbb'];
  }
}
