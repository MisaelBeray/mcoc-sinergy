import { CreateSinergyInput } from './create-sinergy.input'
import { InputType, PartialType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateSinergyInput extends PartialType(CreateSinergyInput) {
  @IsString()
  @Field(() => String, { description: "sinergy's id" })
  id: string
}