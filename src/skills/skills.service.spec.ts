import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from './skills.service';
import { getModelToken } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { Skill } from './schemas/skill.schema';
import { Types } from 'mongoose';
import { UpdateSkillInput } from './dto/update-skill.input';
import { CreateSkillInput } from './dto/create-skill.input';

describe('SkillsService', () => {
  let service: SkillsService;

  const skillsModelMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: getModelToken(Skill.name),
          useValue: skillsModelMock,
        },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a skill using a specific id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      skillsModelMock.findById.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id, name }),
      });

      expect(await service.findOne(id)).toEqual({ id, name });
    });
  });

  describe('findAll', () => {
    skillsModelMock.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([]),
    });

    it('should return a list of skill the all champions', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a skill by a given id', async () => {
      const _id = faker.datatype.uuid();

      skillsModelMock.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ _id }),
      });

      expect(await service.update(_id, new UpdateSkillInput())).toEqual({
        _id,
      });
    });
  });

  describe('create', () => {
    it('should create a skill', async () => {
      skillsModelMock.create.mockReturnValueOnce(new Skill());

      expect(await service.create(new CreateSkillInput())).toBeInstanceOf(
        Skill,
      );
    });
  });

  describe('remove', () => {
    it('should remove a skill by a given id', async () => {
      const id = new Types.ObjectId().toHexString();
      const name = faker.datatype.string();

      skillsModelMock.findByIdAndRemove.mockReturnValueOnce({
        exec: jest.fn().mockReturnValueOnce({ id }),
      });

      expect(await service.remove(id)).toEqual({ id });
    });
  });
});
