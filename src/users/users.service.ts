import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
   
    const { password: plainPassword } = createUserInput
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS))
    createUserInput.password = await bcrypt.hash(plainPassword, salt)
    const createUser = new this.userModel(createUserInput);
    return await createUser.save();
  }

  async findAll() {
    return this.userModel.find().exec()
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id).exec()

    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = this.userModel.findByIdAndUpdate(id, updateUserInput).exec()

    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }
    return user
  }

  async remove(id: string) {
    const userDeleted = this.userModel.findByIdAndRemove(id).exec()

    if (!userDeleted) {
      throw new InternalServerErrorException()
    }
    return userDeleted
  }

  async findByEmail(email: string) {
    const userByEmail = this.userModel.findOne({ email }).exec()

    if (!userByEmail) {
      throw new NotFoundException("User doesn't exist")
    }

    return userByEmail
  }
}
