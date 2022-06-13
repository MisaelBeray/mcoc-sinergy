import { Test, TestingModule } from '@nestjs/testing';
import { SpecialAttacksService } from './special-attacks.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { SpecialAttack } from './schemas/special-attack.schema';
import { Types } from 'mongoose';
import { UpdateSpecialAttackInput } from './dto/update-special-attack.input';
import { CreateSpecialAttackInput } from './dto/create-special-attack.input';

describe('SpecialAttacksService', () => {
  let service: SpecialAttacksService;

  const specialAttacksModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialAttacksService,
        {
          provide: getModelToken(SpecialAttack.name),
          useValue: specialAttacksModelMock,
        },
      ],
    }).compile();

    service = module.get<SpecialAttacksService>(SpecialAttacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a special attack using a specific id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      specialAttacksModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id, name }),
      });

      expect(await service.findOne(id)).toEqual({ id, name });
    });
  });

  describe('findAll', () => {
    specialAttacksModelMock.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([]),
    });

    it('should return a list of special attack the all champions', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a special attack by a given id', async () => {
      const _id = faker.datatype.uuid();

      specialAttacksModelMock.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ _id }),
      });

      expect(await service.update(_id, new UpdateSpecialAttackInput())).toEqual({
        _id,
      });
    });
  });

  describe('create', () => {
    it('should create a special attack', async () => {
      specialAttacksModelMock.create.mockReturnValueOnce(new SpecialAttack());

      expect(await service.create(new CreateSpecialAttackInput())).toBeInstanceOf(
        SpecialAttack,
      );
    });
  });

  describe('remove', () => {
    it('should remove a special attack by a given id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      specialAttacksModelMock.findByIdAndRemove.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id }),
      });

      expect(await service.remove(id)).toEqual({ id });
    });
  });
});
