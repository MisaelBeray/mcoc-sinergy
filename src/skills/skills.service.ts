import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  update(id: number, updateSkillInput: UpdateSkillInput) {
    return `This action updates a #${id} skill`;
  }

  remove(id: number) {
    return `This action removes a #${id} skill`;
  }
}
