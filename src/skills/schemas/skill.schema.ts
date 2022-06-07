import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SkillDocument = Skill & Document

@Schema()
@ObjectType()
export class Skill {
  @Field(() => String)
  _id: string

  @Prop()
  @Field(() => String)
  name: string

}

export const ProfessionalSchema = SchemaFactory.createForClass<Skill>(
  Skill
)
