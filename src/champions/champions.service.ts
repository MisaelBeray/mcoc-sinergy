import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
          await (
            await (
              await (await createChampion.save()).populate('special_attacks')
            ).populate('styles_of_combat')
          ).populate('attributes')
        ).populate('organizations')
      ).populate('skills')
    ).populate('sinergies');
  }

  async findAll(): Promise<Champion[]> {
    return await this.championModel
      .find()
      .populate('special_attacks')
      .populate('styles_of_combat')
      .populate('attributes')
      .populate('organizations')
      .populate('skills')
      .populate('sinergies')
      .lean();
  }

  async findOne(id: string) {
    const champion = this.championModel.findById(id).exec()

    if (!champion) {
      throw new NotFoundException('champion not found')
    }
    return champion
  }

  async update(id: string, updateChampionInput: UpdateChampionInput) {
    const champion = this.championModel.findByIdAndUpdate(id, updateChampionInput).exec()

    if (!champion) {
      throw new NotFoundException("champion doesn't exist")
    }
    return champion
  }

  async remove(id: string) {
    const championDeleted = this.championModel.findByIdAndRemove(id).exec()

    if (!championDeleted) {
      throw new InternalServerErrorException()
    }
    return championDeleted
  }
}
