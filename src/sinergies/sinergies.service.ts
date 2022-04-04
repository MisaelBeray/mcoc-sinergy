import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
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

  async find(): Promise<Sinergy[]> {
    return await this.sinergyModel.find().lean();
  }
  findOne(id: number) {
    return `This action returns a #${id} sinergy`;
  }

  update(id: number, updateSinergyInput: UpdateSinergyInput) {
    return `This action updates a #${id} sinergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} sinergy`;
  }
}
