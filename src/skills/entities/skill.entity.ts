import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export const skillsSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

@ObjectType()
export class Skill extends Document {

  @Field(() => String, { description: 'id of the skill' })
  _id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'name of the skill' })
  name: string;

}
