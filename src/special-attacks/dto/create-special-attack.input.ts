import { InputType, Field} from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSpecialAttackInput {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field(() => String, { description: 'name of the special attack' })
  name: string;

  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Field(() => String, { description: 'description of the special attack' })
  description: string;

  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Field(() => String, { description: 'status of the special attack' })
  status: string;
}
