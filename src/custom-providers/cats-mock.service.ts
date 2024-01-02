import { Injectable } from '@nestjs/common';

/**
 * @description mock catservice
 */
@Injectable()
export class CatsMockService {
  getPlayerList() {
    return ['欧文', '詹姆斯'];
  }
}
