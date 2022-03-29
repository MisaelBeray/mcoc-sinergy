import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsResolver } from './champions.resolver';
import { DatabaseModule } from '../database/database.module';
import { championsProviders } from './champions.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ChampionsResolver, ChampionsService, ...championsProviders],
})
export class ChampionsModule {}
