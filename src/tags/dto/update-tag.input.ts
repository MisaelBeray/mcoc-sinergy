import { CreateTagInput } from './create-tag.input'
import { InputType, PartialType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @IsString()
  @Field(() => String, { description: "tag's id" })
  id: string
}