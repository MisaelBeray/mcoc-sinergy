import { Test, TestingModule } from '@nestjs/testing';
import { SinergiesService } from './sinergies.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { Sinergy } from './schemas/sinergy.schema';
import { Types } from 'mongoose';
import { UpdateSinergyInput } from './dto/update-sinergy.input';
import { CreateSinergyInput } from './dto/create-sinergy.input';

describe('SinergiesService', () => {
  let service: SinergiesService;

  const sinergyModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SinergiesService,
        {
          provide: getModelToken(Sinergy.name),
          useValue: sinergyModelMock,
        },
      ],
    }).compile();

    service = module.get<SinergiesService>(SinergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a sinergy using a specific id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      sinergyModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id, name }),
      });

      expect(await service.findOne(id)).toEqual({ id, name });
    });
  });

  describe('findAll', () => {
    sinergyModelMock.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([]),
    });

    it('should return a list of sinergy the all champions', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a sinergy by a given id', async () => {
      const _id = faker.datatype.uuid();

      sinergyModelMock.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ _id }),
      });

      expect(await service.update(_id, new UpdateSinergyInput())).toEqual({
        _id,
      });
    });
  });

  describe('create', () => {
    it('should create a sinergy', async () => {
      sinergyModelMock.create.mockReturnValueOnce(new Sinergy());

      expect(await service.create(new CreateSinergyInput())).toBeInstanceOf(
        Sinergy,
      );
    });
  });

  describe('remove', () => {
    it('should remove a sinergy by a given id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      sinergyModelMock.findByIdAndRemove.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id }),
      });

      expect(await service.remove(id)).toEqual({ id });
    });
  });
});
