import { CreateSpecialAttackInput } from './create-special-attack.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpecialAttackInput extends PartialType(CreateSpecialAttackInput) {
  @Field(() => Int)
  id: number;
}
