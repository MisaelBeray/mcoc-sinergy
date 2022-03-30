import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SpecialAttack } from '../../special-attacks/entities/special-attack.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Prop } from '@nestjs/mongoose';

export const championsSchema = new mongoose.Schema({
  name: String,
  class_power: String,
  special_attacks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Special_Attacks' },
  ],
  styles_of_combat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
  attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
  profile: String,
});

@ObjectType()
export class Champion extends Document {
  @Field(() => String, { description: 'id of the champion' })
  _id: string;

  @Field(() => String, { description: 'name of the champion' })
  name: string;

  @Field(() => String, { description: 'class of the champion' })
  class_power: string;

  @Field(() => [SpecialAttack], {
    description: 'special attack of the champion',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Special_Attacks' })
  special_attacks: SpecialAttack[];

  @Field(() => [Tag], {
    description: 'styles combat of the champion'
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' })
  styles_of_combat: Tag[];

  @Field(() => [Tag], {
    description: 'attributes of the champion'
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' })
  attributes: Tag[];

  @Field(() => [Tag], {
    description: 'organizations of the champion'
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' })
  organizations: Tag[];

  @Field(() => String, {
    description: 'profile of the champion',
    nullable: true,
  })
  profile: string;
}
