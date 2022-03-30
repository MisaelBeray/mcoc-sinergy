import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
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

  async find(): Promise<Tag[]> {
    return await this.tagModel.find().lean();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
