import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schema/player.schema';
// import { AccountSchema } from './schema/account.schema';
import { DatabaseService } from './database.service';

@Module({
  /*   imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
  ], */
  imports: [
    /*     MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]), */
    MongooseModule.forFeatureAsync([
      {
        name: Player.name,
        useFactory: () => {
          const schema = PlayerSchema;
          /*           schema.pre('save', function () {
            console.log('hello from pre save');
          }); */
          schema.post('save', () => {
            console.log('hello from 111 save');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
