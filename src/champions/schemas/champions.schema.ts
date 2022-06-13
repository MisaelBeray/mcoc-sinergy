import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SpecialAttack } from '../../special-attacks/schemas/special-attack.schema';
import * as mongoose from 'mongoose';
import { Tag } from '../../tags/schemas/tag.schema';
import { Skill } from '../../skills/schemas/skill.schema';
import { Sinergy } from '../../sinergies/schemas/sinergy.schema';

export type ChampionDocument = Champion & Document;

@Schema()
@ObjectType()
export class Champion {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  class_power: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Special_Attacks' })
  @Field(() => [SpecialAttack])
  special_attacks: SpecialAttack[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  @Field(() => [Tag])
  styles_of_combat: Tag[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  @Field(() => [Tag])
  attributes: Tag[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  @Field(() => [Tag])
  organizations: Tag[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' })
  @Field(() => [Skill])
  skills: Skill[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sinergy' })
  @Field(() => [Sinergy])
  sinergies: Sinergy[];

  @Prop()
  @Field(() => String)
  profile: string;
}

export const ChampionSchema = SchemaFactory.createForClass<Champion>(Champion);
