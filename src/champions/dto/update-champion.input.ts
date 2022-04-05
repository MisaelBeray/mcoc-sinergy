import { CreateChampionInput } from './create-champion.input'
import { InputType, PartialType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UpdateChampionInput extends PartialType(CreateChampionInput) {
  @IsString()
  @Field(() => String, { description: "champion's id" })
  id: string
}