import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export const sinergiesSchema = new mongoose.Schema({
  name: String,
  champions: [{ type: String }],
  description: String,
});

@ObjectType()
export class Sinergy extends Document {
  @Field(() => String, { description: 'id of the sinergy' })
  _id: string;

  @Field(() => String, { description: 'name of the sinergy' })
  name: string;

  @Field(() => [String], {
    description: 'champions of the sinergy',
  })
  champions: string;

  @Field(() => String, { description: 'description of the sinergy' })
  description: string;
}
