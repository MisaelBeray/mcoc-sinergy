import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSkillInput {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Field(() => String, { description: 'name of the skill' })
  name: string;
}