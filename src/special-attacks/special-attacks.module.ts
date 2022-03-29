import { Module } from '@nestjs/common';
import { SpecialAttacksService } from './special-attacks.service';
import { SpecialAttacksResolver } from './special-attacks.resolver';
import { DatabaseModule } from '../database/database.module';
import { specialAttacksProviders } from './special-attacks.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SpecialAttacksResolver, SpecialAttacksService, ...specialAttacksProviders]
})
export class SpecialAttacksModule {}
