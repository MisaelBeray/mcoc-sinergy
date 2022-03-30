import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const skillsSchema = new mongoose.Schema({
  name: String,
});

@ObjectType()
export class Skill extends Document {

  @Field(() => String, { description: 'id of the skill' })
  _id: string;

  @Field(() => String, { description: 'name of the skill' })
  name: string;

}
