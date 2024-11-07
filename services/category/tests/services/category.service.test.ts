import { Request, Response } from 'express';
import { CategoryService } from '../../src/services/category.service';
import { db } from '../../src/database';
import { slugify } from '../../src/utils/constants';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let findUniqueSpy: jest.SpyInstance;

  beforeEach(() => {
    categoryService = new CategoryService();
    findUniqueSpy = jest.spyOn(db.category, 'findUnique');
  });

  afterEach(() => {
    findUniqueSpy.mockRestore();
  });

  describe('getCategoryById', () => {
    it('should return category with status 200', async () => {
      const req = {
        params: { id: 'cuid_123' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockCategory = {
        id: 'cuid_123',
        name: 'Electronics',
        slug: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      findUniqueSpy.mockResolvedValue(mockCategory);

      await categoryService.getCategoryById(req, res);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: 'cuid_123' },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return 404 if category not found', async () => {
      const req = {
        params: { id: 'cuid_123' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      findUniqueSpy.mockResolvedValue(null);

      await categoryService.getCategoryById(req, res);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: 'cuid_123' },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });
  });
});
