import { Request, Response } from 'express';
import { CategoryService } from '../../src/services/category.service';
import { db } from '../../src/database';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let findUniqueSpy: jest.SpyInstance;
  let findManySpy: jest.SpyInstance;
  let createSpy: jest.SpyInstance;
  let updateSpy: jest.SpyInstance;
  let deleteSpy: jest.SpyInstance;

  beforeEach(() => {
    categoryService = new CategoryService();
    findUniqueSpy = jest.spyOn(db.category, 'findUnique');
    findManySpy = jest.spyOn(db.category, 'findMany');
    createSpy = jest.spyOn(db.category, 'create');
    updateSpy = jest.spyOn(db.category, 'update');
    deleteSpy = jest.spyOn(db.category, 'delete');
  });

  afterEach(() => {
    findUniqueSpy.mockRestore();
    findManySpy.mockRestore();
    createSpy.mockRestore();
    updateSpy.mockRestore();
    deleteSpy.mockRestore();
  });

  describe('getCategories', () => {
    it('should return categories with status 200', async () => {
      const req = {} as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockCategories = [
        {
          id: 'cuid_123',
          name: 'Electronics',
          slug: 'electronics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'cuid_456',
          name: 'Clothing',
          slug: 'clothing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      findManySpy.mockResolvedValue(mockCategories);

      await categoryService.getCategories(req, res);

      expect(findManySpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('should return 500 if an error occurs', async () => {
      const req = {} as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      findManySpy.mockRejectedValue(new Error('Database error'));

      await categoryService.getCategories(req, res);

      expect(findManySpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching categories',
      });
    });
  });

  describe('createCategory', () => {
    it('should create a category with status 201', async () => {
      const req = {
        body: { name: 'Electronics' },
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
      createSpy.mockResolvedValue(mockCategory);

      await categoryService.createCategory(req, res);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          name: 'Electronics',
          slug: 'electronics',
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return 500 if an error occurs', async () => {
      const req = {
        body: { name: 'Electronics' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      createSpy.mockRejectedValue(new Error('Database error'));

      await categoryService.createCategory(req, res);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          name: 'Electronics',
          slug: 'electronics',
        },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating category',
      });
    });
  });

  describe('updateCategory', () => {
    it('should update a category with status 200', async () => {
      const req = {
        params: { id: 'cuid_123' },
        body: { name: 'New Electronics' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockCategory = {
        id: 'cuid_123',
        name: 'New Electronics',
        slug: 'new-electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      updateSpy.mockResolvedValue(mockCategory);

      await categoryService.updateCategory(req, res);

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: 'cuid_123',
        },
        data: {
          name: 'New Electronics',
          slug: 'new-electronics',
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return 500 if an error occurs', async () => {
      const req = {
        params: { id: 'cuid_123' },
        body: { name: 'New Electronics' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      updateSpy.mockRejectedValue(new Error('Database error'));

      await categoryService.updateCategory(req, res);

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: 'cuid_123',
        },
        data: {
          name: 'New Electronics',
          slug: 'new-electronics',
        },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating category',
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category with status 204', async () => {
      const req = {
        params: { id: 'cuid_123' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      deleteSpy.mockResolvedValue(undefined);

      await categoryService.deleteCategory(req, res);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: {
          id: 'cuid_123',
        },
      });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
      const req = {
        params: { id: 'cuid_123' },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      deleteSpy.mockRejectedValue(new Error('Database error'));

      await categoryService.deleteCategory(req, res);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: {
          id: 'cuid_123',
        },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error deleting category',
      });
    });
  });
});
