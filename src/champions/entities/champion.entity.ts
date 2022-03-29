import { ObjectType, Field, ID } from '@nestjs/graphql';
import { isMongoId, IS_MONGO_ID } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SpecialAttack } from '../../special-attacks/entities/special-attack.entity';
import { Prop } from '@nestjs/mongoose';
import { specialAttacksProviders } from 'src/special-attacks/special-attacks.providers';

export const championsSchema = new mongoose.Schema({
  name: String,
  class_power: String,
  special_attacks: [{ type: mongoose.Schema.Types.ObjectId, ref: SpecialAttack.name }],
});

@ObjectType()
export class Champion extends Document {
  @Field(() => String, { description: 'name of the champion' })
  name: string;

  @Field(() => String, { description: 'class of the champion' })
  class_power: string;

  @Field(() => [SpecialAttack], { description: 'special attack of the champion' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SpecialAttack.name })
  special_attacks: SpecialAttack[];
}
