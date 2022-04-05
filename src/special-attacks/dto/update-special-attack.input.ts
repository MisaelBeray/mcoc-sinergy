import { CreateSpecialAttackInput } from './create-special-attack.input'
import { InputType, PartialType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateSpecialAttackInput extends PartialType(CreateSpecialAttackInput) {
  @IsString()
  @Field(() => String, { description: "special attack's id" })
  id: string
}