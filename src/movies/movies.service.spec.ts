import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeLength = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      const afterLength = service.getAll().length;
      expect(afterLength).toBeGreaterThan(beforeLength);
    });
  });
  describe('getOne', () => {
    it('should return movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 not found", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      const beforeLength = service.getAll().length;
      service.deleteOne(1);
      const afterLength = service.getAll().length;
      expect(afterLength).toBeLessThan(beforeLength);
    });
    it('should return 404 not found', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  });
  describe('update', () => {
    it('should update movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should return 404 not found', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  })
});
