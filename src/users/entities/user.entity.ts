import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { UnionDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/union-definition.factory';

export const usersSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

@ObjectType()
export class User extends Document {
  @Field(() => String, { description: 'id of the user' })
  _id: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
