import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const tagsSchema = new mongoose.Schema({
  name: String,
});

@ObjectType()
export class Tag extends Document {

  @Field(() => String, { description: 'id of the tag' })
  _id: string;

  @Field(() => String, { description: 'name of the tag' })
  name: string;

}
