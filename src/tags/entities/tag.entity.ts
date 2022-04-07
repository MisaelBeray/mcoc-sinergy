import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export const tagsSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

@ObjectType()
export class Tag extends Document {

  @Field(() => String, { description: 'id of the tag' })
  _id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'name of the tag' })
  name: string;

}
