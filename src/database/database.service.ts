import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schema/player.schema';
import { AccountSchema } from './schema/account.schema';
import * as mongoose from 'mongoose';
const Account = mongoose.model('Account', AccountSchema);

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}
  async create(data: any) {
    const createdPlayer = new this.playerModel(data);
    const result = await createdPlayer.save();
    console.log('result:', result);
    return result;
  }
  async createAccount(data: any) {
    // 此方法 暂未保存成功, 显示超时
    console.log('接受的数据', data);
    Account.create(data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      });
    return 'hello world';
  }
}
