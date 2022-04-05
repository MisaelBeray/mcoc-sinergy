import { Injectable, Inject } from '@nestjs/common';
import { CreateSpecialAttackInput } from './dto/create-special-attack.input';
import { UpdateSpecialAttackInput } from './dto/update-special-attack.input';
import { SpecialAttack } from './entities/special-attack.entity';
import { Model } from 'mongoose';

@Injectable()
export class SpecialAttacksService {
  constructor(
    @Inject('SPECIAL_ATTACKS_MODEL')
    private specialAttackModel: Model<SpecialAttack>,
  ) {}

  async create(createSpecialAttackInput: CreateSpecialAttackInput): Promise<CreateSpecialAttackInput> {
    const createSpecialAttack = new this.specialAttackModel(createSpecialAttackInput);

    return createSpecialAttack.save();
  }

  async findAll(): Promise<SpecialAttack[]> {
    return this.specialAttackModel.find().lean();
  }

  findOne(id: number) {
    return `This action returns a #${id} specialAttack`;
  }

  update(id: number, updateSpecialAttackInput: UpdateSpecialAttackInput) {
    return `This action updates a #${id} specialAttack`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialAttack`;
  }
}
