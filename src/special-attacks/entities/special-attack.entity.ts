import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export const specialAttacksSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  status: String,
});

@ObjectType()
export class SpecialAttack extends Document {

  @Field(() => String, { description: 'id of the special attack' })
  _id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'name of the special attack' })
  name: string;

  @Field(() => String, { description: 'description of the special attack' })
  description: string;

  @Field(() => String, { description: 'status of the special attack' })
  status: string;

}
