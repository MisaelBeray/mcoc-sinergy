import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';
import { DatabaseModule } from '../database/database.module';
import { skillsProviders } from './skills.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SkillsResolver, SkillsService, ...skillsProviders]
})
export class SkillsModule {}
