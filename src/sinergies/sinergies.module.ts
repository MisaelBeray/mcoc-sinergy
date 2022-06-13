import { Module } from '@nestjs/common';
import { SinergiesService } from './sinergies.service';
import { SinergiesResolver } from './sinergies.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinergy, SinergySchema } from './schemas/sinergy.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Sinergy.name, schema: SinergySchema }
  ]),],
  providers: [SinergiesResolver, SinergiesService]
})
export class SinergiesModule {}
