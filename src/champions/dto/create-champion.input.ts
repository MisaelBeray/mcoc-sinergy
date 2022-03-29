import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsInt,
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
  classPower: string;

}
