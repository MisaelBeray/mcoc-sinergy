import { CreateSinergyInput } from './create-sinergy.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSinergyInput extends PartialType(CreateSinergyInput) {
  @Field(() => Int)
  id: number;
}
