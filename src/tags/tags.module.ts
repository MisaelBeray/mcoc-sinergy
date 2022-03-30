import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { DatabaseModule } from '../database/database.module';
import { tagsProviders } from './tags.providers';

@Module({
  imports: [DatabaseModule],
  providers: [TagsResolver, TagsService, ...tagsProviders],
})
export class TagsModule {}
