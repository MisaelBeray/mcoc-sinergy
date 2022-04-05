import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

  async update(id: string, updateTagInput: UpdateTagInput) {
    const tag = this.tagModel.findByIdAndUpdate(id, updateTagInput).exec()

    if (!tag) {
      throw new NotFoundException("tag doesn't exist")
    }
    return tag
  }

  async remove(id: string) {
    const tagDeleted = this.tagModel.findByIdAndRemove(id).exec()

    if (!tagDeleted) {
      throw new InternalServerErrorException()
    }
    return tagDeleted
  }
}
