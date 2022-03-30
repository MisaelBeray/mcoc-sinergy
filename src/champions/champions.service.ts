import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateChampionInput } from './dto/create-champion.input';
import { UpdateChampionInput } from './dto/update-champion.input';
import { Champion } from './entities/champion.entity';

@Injectable()
export class ChampionsService {
  constructor(
    @Inject('CHAMPIONS_MODEL')
    private championModel: Model<Champion>,
  ) {}

  async create(createChampionInput: CreateChampionInput): Promise<Champion> {
    const createChampion = new this.championModel(createChampionInput);

    return (
      await (
        await (
          await (await createChampion.save()).populate('special_attacks')
        ).populate('styles_of_combat')
      ).populate('attributes')
    ).populate('organizations');
  }

  async find(): Promise<Champion[]> {
    return await this.championModel
      .find()
      .populate('special_attacks')
      .populate('styles_of_combat')
      .populate('attributes')
      .populate('organizations')
      .lean();
  }

  findOne(id: number) {
    return `This action returns a #${id} champion`;
  }

  update(id: number, updateChampionInput: UpdateChampionInput) {
    return `This action updates a #${id} champion`;
  }

  remove(id: number) {
    return `This action removes a #${id} champion`;
  }
}
