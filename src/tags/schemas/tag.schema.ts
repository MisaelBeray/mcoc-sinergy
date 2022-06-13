import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TagDocument = Tag & Document

@Schema({ collection: 'tags' })
@ObjectType()
export class Tag {
  @Field(() => String)
  _id: string

  @Prop()
  @Field(() => String)
  name: string

}

export const TagSchema = SchemaFactory.createForClass<Tag>(
  Tag
)
