import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSpecialAttackInput } from './dto/create-special-attack.input';
import { UpdateSpecialAttackInput } from './dto/update-special-attack.input';
import { Model } from 'mongoose';
import { SpecialAttack, SpecialAttackDocument } from './schemas/special-attack.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SpecialAttacksService {
  constructor(
    @InjectModel(SpecialAttack.name)
    private specialAttackModel: Model<SpecialAttackDocument>,
  ) {}

  async create(createSpecialAttackInput: CreateSpecialAttackInput): Promise<CreateSpecialAttackInput> {
    return this.specialAttackModel.create({ ...createSpecialAttackInput });
  }

  async findAll(): Promise<SpecialAttack[]> {
    return this.specialAttackModel.find().lean();
  }

  async findOne(id: string) {
    const specialAttack = this.specialAttackModel.findById(id).exec()

    if (!specialAttack) {
      throw new NotFoundException('specialAttack not found')
    }
    return specialAttack
  }

  async update(id: string, updateSpecialAttackInput: UpdateSpecialAttackInput) {
    const specialAttack = this.specialAttackModel.findByIdAndUpdate(id, updateSpecialAttackInput).exec()

    if (!specialAttack) {
      throw new NotFoundException("special attack doesn't exist")
    }
    return specialAttack
  }

  async remove(id: string) {
    const specialAttackDeleted = this.specialAttackModel.findByIdAndRemove(id).exec()

    if (!specialAttackDeleted) {
      throw new InternalServerErrorException()
    }
    return specialAttackDeleted
  }
}
