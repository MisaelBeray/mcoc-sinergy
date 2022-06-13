import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Skill.name, schema: SkillSchema }
  ]),],
  providers: [SkillsResolver, SkillsService]
})
export class SkillsModule {}
