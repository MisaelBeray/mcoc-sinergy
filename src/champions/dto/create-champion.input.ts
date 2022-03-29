import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsInt,
  IsMongoId,
} from 'class-validator';
import mongoose from 'mongoose';
import { SpecialAttack } from '../../special-attacks/entities/special-attack.entity';
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
  @Field(() => [mongoose.Schema.Types.ObjectId], {
    description: 'special attacks of the champion',
  })
  special_attacks: [mongoose.Schema.Types.ObjectId];
}
