import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsResolver } from './champions.resolver';
import { DatabaseModule } from '../database/database.module';
import { championsProviders } from './champions.providers';
import { SpecialAttacksModule } from 'src/special-attacks/special-attacks.module';

@Module({
  imports: [DatabaseModule, SpecialAttacksModule],
  providers: [ChampionsResolver, ChampionsService, ...championsProviders],
})
export class ChampionsModule {}
