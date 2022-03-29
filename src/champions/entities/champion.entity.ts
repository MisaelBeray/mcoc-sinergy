import { ObjectType, Field, Int } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const ChampionsSchema = new mongoose.Schema({
  name: String,
  classPower: String,
});

@ObjectType()
export class Champion extends Document {
  @Field(() => String, { description: 'Name of the champion' })
  name: string;

  @Field(() => String, { description: 'Class of the champion' })
  classPower: string;
}
