import { playerObjet } from './player-object';
import { Injectable, Inject } from '@nestjs/common';
// import type { PlayerObject } from './no-class-object';

@Injectable()
export class CustomProviderCatService {
  constructor(
    @Inject('player_service')
    private readonly playerService: typeof playerObjet,
  ) {}
  getPlayerList() {
    return this.playerService.getPlayerList();
  }
  getTeamList() {
    return this.getTeamList();
  }
  /*   getPlayerList() {
    return ['a', 'b'];
  }
  getTeamList() {
    return ['a1111'];
  } */
}
