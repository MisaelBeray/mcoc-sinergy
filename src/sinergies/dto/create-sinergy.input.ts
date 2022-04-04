import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSinergyInput {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field(() => String, { description: 'name of the sinergy' })
  name: string;

  @Field(() => [String], {
    description: 'champions of the sinergy',
  })
  champions: string;

  @IsString()
  @MinLength(1)
  @Field(() => String, { description: 'description of the sinergy' })
  description: string;
}