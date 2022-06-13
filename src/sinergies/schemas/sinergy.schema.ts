import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SinergyDocument = Sinergy & Document

@Schema()
@ObjectType()
export class Sinergy {
  @Field(() => String)
  _id: string

  @Prop()
  @Field(() => String)
  name: string

  @Prop()
  @Field(() => String)
  champions: string

  @Prop()
  @Field(() => String)
  description: string

}

export const SinergySchema = SchemaFactory.createForClass<Sinergy>(
  Sinergy
)
