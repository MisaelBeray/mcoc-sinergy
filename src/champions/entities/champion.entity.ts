import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SpecialAttack } from '../../special-attacks/entities/special-attack.entity';
import { Prop } from '@nestjs/mongoose';

export const championsSchema = new mongoose.Schema({
  name: String,
  class_power: String,
  special_attacks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Special_Attacks' },
  ],
});

@ObjectType()
export class Champion extends Document {
  @Field(() => String, { description: 'name of the champion' })
  name: string;

  @Field(() => String, { description: 'class of the champion' })
  class_power: string;

  @Field(() => [SpecialAttack], {
    description: 'special attack of the champion',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Special_Attacks' })
  special_attacks: SpecialAttack[];
}
