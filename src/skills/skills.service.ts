import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @Inject('SKILLS_MODEL')
    private skillModel: Model<Skill>,
  ) {}

  async create(createSkillInput: CreateSkillInput): Promise<Skill> {
    const createSkill = new this.skillModel(createSkillInput);

    return await createSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillModel.find().lean();
  }

  async findOne(id: string) {
    const skill = this.skillModel.findById(id).exec()

    if (!skill) {
      throw new NotFoundException('skill not found')
    }
    return skill
  }

  async update(id: string, updateSkillInput: UpdateSkillInput) {
    const skill = this.skillModel.findByIdAndUpdate(id, updateSkillInput).exec()

    if (!skill) {
      throw new NotFoundException("skill doesn't exist")
    }
    return skill
  }

  async remove(id: string) {
    const skillDeleted = this.skillModel.findByIdAndRemove(id).exec()

    if (!skillDeleted) {
      throw new InternalServerErrorException()
    }
    return skillDeleted
  }
}
