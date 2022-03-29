import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
@InputType()
export class CreateChampionInput {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field(() => String, { description: 'name of the champion' })
  name: string;

  @IsString()
  @MinLength(9)
  @MaxLength(15)
  @Field(() => String, { description: 'class of the champion' })
  class_power: string;

  @IsString()
  @Field(() => [String], {
    description: 'special attacks of the champion',
  })
  special_attacks: string[];
}
