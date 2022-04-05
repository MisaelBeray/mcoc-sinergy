import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  update(id: number, updateSinergyInput: UpdateSinergyInput) {
    return `This action updates a #${id} sinergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} sinergy`;
  }
}
