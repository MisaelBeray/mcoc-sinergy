import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
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

  @IsString()
  @IsOptional()
  @Field(() => [String], {
    description: 'styles combat of the champion',
  })
  styles_of_combat: string[];

  @IsString()
  @IsOptional()
  @Field(() => [String], {
    description: 'styles combat of the champion',
  })
  attributes: string[];

  @IsString()
  @IsOptional()
  @Field(() => [String], {
    description: 'organizations of the champion',
  })
  organizations: string[];

  @IsString()
  @IsOptional()
  @Field(() => [String], {
    description: 'skills of the champion',
  })
  skills: string[];

  @IsOptional()
  @IsString()
  @MinLength(9)
  @Field(() => String, { description: 'profile of the champion' })
  profile: string;
}
