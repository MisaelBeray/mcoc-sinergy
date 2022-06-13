import { Module } from '@nestjs/common';
import { SpecialAttacksService } from './special-attacks.service';
import { SpecialAttacksResolver } from './special-attacks.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SpecialAttack,
  SpecialAttackSchema,
} from './schemas/special-attack.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SpecialAttack.name, schema: SpecialAttackSchema },
    ]),
  ],
  providers: [SpecialAttacksResolver, SpecialAttacksService],
})
export class SpecialAttacksModule {}
