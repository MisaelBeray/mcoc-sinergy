import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialAttackDocument = SpecialAttack & Document;

@Schema({ collection: 'special_attacks' })
@ObjectType()
export class SpecialAttack {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => String)
  status: string;
}

export const SpecialAttackSchema = SchemaFactory.createForClass(SpecialAttack);
