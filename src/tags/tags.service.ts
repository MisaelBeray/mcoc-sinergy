import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
  ) {}

  async create(createTagInput: CreateTagInput): Promise<CreateTagInput> {
    return this.tagModel.create({ ...createTagInput });
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().lean();
  }

  async findOne(id: string) {
    const tag = this.tagModel.findById(id).exec();

    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    return tag;
  }

  async update(id: string, updateTagInput: UpdateTagInput) {
    const tag = this.tagModel.findByIdAndUpdate(id, updateTagInput).exec();

    if (!tag) {
      throw new NotFoundException("tag doesn't exist");
    }
    return tag;
  }

  async remove(id: string) {
    const tagDeleted = this.tagModel.findByIdAndRemove(id).exec();

    if (!tagDeleted) {
      throw new InternalServerErrorException();
    }
    return tagDeleted;
  }
}
