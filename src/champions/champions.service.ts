import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateChampionInput } from './dto/create-champion.input';
import { UpdateChampionInput } from './dto/update-champion.input';
import { SendMailProducesService } from '../jobs/sendMail-producer-service';
import { Champion, ChampionDocument } from './schemas/champions.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChampionsService {
  constructor(
    @InjectModel(Champion.name)
    private championModel: Model<ChampionDocument>,
    private sendMailService: SendMailProducesService,
  ) {}

  create(createChampionInput: CreateChampionInput) {
    const createChampion = new this.championModel(createChampionInput);
    this.sendMailService.sendMail(createChampion);

    return this.championModel.create(createChampionInput);
  }

  async findAll(): Promise<Champion[]> {
    return await this.championModel
      .aggregate([
        {
          $lookup: {
            from: 'special_attacks',
            localField: 'special_attacks',
            foreignField: '_id',
            as: 'special_attacks',
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'styles_of_combat',
            foreignField: '_id',
            as: 'styles_of_combat',
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'attributes',
            foreignField: '_id',
            as: 'attributes',
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'organizations',
            foreignField: '_id',
            as: 'organizations',
          },
        },
        {
          $lookup: {
            from: 'skills',
            localField: 'skills',
            foreignField: '_id',
            as: 'skills',
          },
        },
        {
          $lookup: {
            from: 'sinergies',
            localField: 'sinergies',
            foreignField: '_id',
            as: 'sinergies',
          },
        },
      ])
      .exec();
  }

  async findOne(id: string) {
    const champion = this.championModel.findById(id).exec();

    if (!champion) {
      throw new NotFoundException('champion not found');
    }
    return champion;
  }

  async update(id: string, updateChampionInput: UpdateChampionInput) {
    const champion = this.championModel
      .findByIdAndUpdate(id, updateChampionInput)
      .exec();

    if (!champion) {
      throw new NotFoundException("champion doesn't exist");
    }
    return champion;
  }

  async remove(id: string) {
    const championDeleted = this.championModel.findByIdAndRemove(id).exec();

    if (!championDeleted) {
      throw new InternalServerErrorException();
    }
    return championDeleted;
  }
}
