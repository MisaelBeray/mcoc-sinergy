import { Module } from '@nestjs/common';
import { SinergiesService } from './sinergies.service';
import { SinergiesResolver } from './sinergies.resolver';
import { DatabaseModule } from '../database/database.module';
import { sinergiesProviders } from './sinergies.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SinergiesResolver, SinergiesService, ...sinergiesProviders]
})
export class SinergiesModule {}
