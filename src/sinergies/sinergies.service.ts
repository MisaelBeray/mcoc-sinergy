import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSinergyInput } from './dto/create-sinergy.input';
import { UpdateSinergyInput } from './dto/update-sinergy.input';
import { Sinergy } from './entities/sinergy.entity';

@Injectable()
export class SinergiesService {
  constructor(
    @Inject('SINERGIES_MODEL')
    private sinergyModel: Model<Sinergy>,
  ) {}

  async create(createSinergyInput: CreateSinergyInput): Promise<Sinergy> {
    const createSinergy = new this.sinergyModel(createSinergyInput);

    return await createSinergy.save();
  }

  async findAll(): Promise<Sinergy[]> {
    return await this.sinergyModel.find().lean();
  }

  async findOne(id: string) {
    const sinergy = this.sinergyModel.findById(id).exec()

    if (!sinergy) {
      throw new NotFoundException('sinergy not found')
    }
    return sinergy
  }

  async update(id: string, updateSinergyInput: UpdateSinergyInput) {
    const sinergy = this.sinergyModel.findByIdAndUpdate(id, updateSinergyInput).exec()

    if (!sinergy) {
      throw new NotFoundException("sinergy doesn't exist")
    }
    return sinergy
  }

  async remove(id: string) {
    const sinergyDeleted = this.sinergyModel.findByIdAndRemove(id).exec()

    if (!sinergyDeleted) {
      throw new InternalServerErrorException()
    }
    return sinergyDeleted
  }
}
