import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { Tag } from './schemas/tag.schema';
import { Types } from 'mongoose';
import { UpdateTagInput } from './dto/update-tag.input';
import { CreateTagInput } from './dto/create-tag.input';

describe('TagsService', () => {
  let service: TagsService;

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
        TagsService,
        {
          provide: getModelToken(Tag.name),
          useValue: specialAttacksModelMock,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a tag using a specific id', async () => {
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

    it('should return a list of tag the all champions', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a tag by a given id', async () => {
      const _id = faker.datatype.uuid();

      specialAttacksModelMock.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ _id }),
      });

      expect(await service.update(_id, new UpdateTagInput())).toEqual({
        _id,
      });
    });
  });

  describe('create', () => {
    it('should create a tag', async () => {
      specialAttacksModelMock.create.mockReturnValueOnce(new Tag());

      expect(await service.create(new CreateTagInput())).toBeInstanceOf(Tag);
    });
  });

  describe('remove', () => {
    it('should remove a tag by a given id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      specialAttacksModelMock.findByIdAndRemove.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id }),
      });

      expect(await service.remove(id)).toEqual({ id });
    });
  });
});
