import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: true })
  name: string;
  @Prop()
  age: number;
  @Prop()
  team: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
