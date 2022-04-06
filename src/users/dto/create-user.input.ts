import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  Matches
} from 'class-validator';

@InputType()
export class CreateUserInput {

  @IsEmail()
  @Field(() => String, { description: "email of the user" })
  email: string

  @IsNotEmpty()
  @Field(() => String, { description: "first name of the user" })
  firstName: string

  @IsNotEmpty()
  @Field(() => String, { description: "last name of the user" })
  lastName: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })

  @Field(() => String, { description: "password of the user" })
  password: string
}
