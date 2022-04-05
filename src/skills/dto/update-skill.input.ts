import { CreateSkillInput } from './create-skill.input'
import { InputType, PartialType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @IsString()
  @Field(() => String, { description: "skill's id" })
  id: string
}