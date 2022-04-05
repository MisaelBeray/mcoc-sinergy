import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_MODEL')
    private tagModel: Model<Tag>,
  ) {}

  async create(createTagInput: CreateTagInput): Promise<Tag> {
    const createTag = new this.tagModel(createTagInput);

    return await createTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().lean();
  }

  async findOne(id: string) {
    const tag = this.tagModel.findById(id).exec()

    if (!tag) {
      throw new NotFoundException('tag not found')
    }
    return tag
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
