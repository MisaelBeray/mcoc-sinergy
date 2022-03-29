import { CreateChampionInput } from './create-champion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChampionInput extends PartialType(CreateChampionInput) {
  @Field(() => Int)
  id: number;
}
