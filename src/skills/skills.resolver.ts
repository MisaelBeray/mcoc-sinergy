import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Mutation(() => Skill)
  async createSkill(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillsService.create(createSkillInput);
  }

  @Query(() => [Skill])
  async skills() {
    return this.skillsService.findAll();
  }


  @Query(() => Skill, { name: 'skill' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.skillsService.findOne(id);
  }

  @Mutation(() => Skill)
  updateSkill(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput) {
    return this.skillsService.update(updateSkillInput.id, updateSkillInput);
  }

  @Mutation(() => Skill)
  removeSkill(@Args('id', { type: () => String }) id: string) {
    return this.skillsService.remove(id);
  }
}
