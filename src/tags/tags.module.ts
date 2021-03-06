import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Tag.name, schema: TagSchema }
  ]),],
  providers: [TagsResolver, TagsService],
})
export class TagsModule {}
