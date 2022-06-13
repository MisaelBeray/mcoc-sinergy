import { Test, TestingModule } from '@nestjs/testing';
import { ChampionsService } from './champions.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { Champion } from './schemas/champions.schema';
import { Types } from 'mongoose';
import { UpdateChampionInput } from './dto/update-champion.input';
import { CreateChampionInput } from './dto/create-champion.input';
import { SendMailProducesService } from '../jobs/sendMail-producer-service';

describe('ChampionsService', () => {
  let service: ChampionsService;

  const championModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChampionsService,
        {
          provide: getModelToken(Champion.name),
          useValue: championModelMock,
        },
        {
          provide: SendMailProducesService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ChampionsService>(ChampionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a champion using a specific id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      championModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id, name }),
      });

      expect(await service.findOne(id)).toEqual({ id, name });
    });
  });

  describe('findAll', () => {
    championModelMock.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([]),
      populate: jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockReturnValueOnce({
            populate: jest.fn().mockReturnValueOnce({
              populate: jest.fn().mockReturnValueOnce({
                populate: jest
                  .fn()
                  .mockReturnValueOnce({
                    lean: jest.fn().mockReturnValueOnce([]),
                  }),
              }),
            }),
          }),
        }),
      }),
    });

    it('should return a list of champions', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a champion by a given id', async () => {
      const _id = faker.datatype.uuid();

      championModelMock.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ _id }),
      });

      expect(await service.update(_id, new UpdateChampionInput())).toEqual({
        _id,
      });
    });
  });

  describe('create', () => {
    it('should create a champion', async () => {

      const createNewChampion = new Champion()

      championModelMock.create.mockReturnValueOnce(createNewChampion);

      expect(await service.create(new CreateChampionInput())).toBeInstanceOf(
        Champion,
      );
    });
  });

  describe('remove', () => {
    it('should remove a champion by a given id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      championModelMock.findByIdAndRemove.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id }),
      });

      expect(await service.remove(id)).toEqual({ id });
    });
  });
});
