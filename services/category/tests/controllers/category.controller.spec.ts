import { CategoryController } from '../../src/controllers/category.controller';
import { CategoryService } from '../../src/services/category.service';
import { Request, Response } from 'express';
import { z } from 'zod';

describe('CategoryController', () => {
  let categoryService: CategoryService;
  let categoryController: CategoryController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    categoryService = {
      getCategories: jest.fn(),
      getCategoryById: jest.fn(),
      createCategory: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
    } as unknown as CategoryService;

    categoryController = new CategoryController(categoryService);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('getCategories', () => {
    it('should return categories and status 200', async () => {
      const mockCategories = [
        {
          id: '1',
          name: 'Electronics',
          slug: 'electronics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (categoryService.getCategories as jest.Mock).mockResolvedValue(
        mockCategories,
      );

      await categoryController.getCategories(req as Request, res as Response);

      expect(categoryService.getCategories).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('should return status 500 on error', async () => {
      (categoryService.getCategories as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await categoryController.getCategories(req as Request, res as Response);

      expect(categoryService.getCategories).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching categories',
      });
    });
  });

  describe('getCategoryById', () => {
    it('should return category and status 200', async () => {
      const mockCategory = {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      req.params = { id: '1' };
      (categoryService.getCategoryById as jest.Mock).mockResolvedValue(
        mockCategory,
      );

      await categoryController.getCategoryById(req as Request, res as Response);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return status 404 if category not found', async () => {
      req.params = { id: '1' };
      (categoryService.getCategoryById as jest.Mock).mockResolvedValue(null);

      await categoryController.getCategoryById(req as Request, res as Response);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should return status 500 on error', async () => {
      req.params = { id: '1' };
      (categoryService.getCategoryById as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await categoryController.getCategoryById(req as Request, res as Response);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching category',
      });
    });
  });

  describe('createCategory', () => {
    it('should create category and return status 201', async () => {
      const mockCategory = {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      req.body = { name: 'Electronics' };
      (categoryService.createCategory as jest.Mock).mockResolvedValue(
        mockCategory,
      );

      await categoryController.createCategory(req as Request, res as Response);

      expect(categoryService.createCategory).toHaveBeenCalledWith(
        'Electronics',
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return status 400 on validation error', async () => {
      req.body = { name: '' }; // Invalid name

      await categoryController.createCategory(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return status 500 on error', async () => {
      req.body = { name: 'Electronics' };
      (categoryService.createCategory as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await categoryController.createCategory(req as Request, res as Response);

      expect(categoryService.createCategory).toHaveBeenCalledWith(
        'Electronics',
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating category',
      });
    });
  });

  describe('updateCategory', () => {
    it('should update category and return status 200', async () => {
      const mockCategory = {
        id: '1',
        name: 'New Electronics',
        slug: 'new-electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      req.params = { id: '1' };
      req.body = { name: 'New Electronics' };
      (categoryService.updateCategory as jest.Mock).mockResolvedValue(
        mockCategory,
      );

      await categoryController.updateCategory(req as Request, res as Response);

      expect(categoryService.updateCategory).toHaveBeenCalledWith(
        '1',
        'New Electronics',
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it('should return status 400 on validation error', async () => {
      req.params = { id: '1' };
      req.body = { name: '' }; // Invalid name

      await categoryController.updateCategory(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return status 500 on error', async () => {
      req.params = { id: '1' };
      req.body = { name: 'New Electronics' };
      (categoryService.updateCategory as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await categoryController.updateCategory(req as Request, res as Response);

      expect(categoryService.updateCategory).toHaveBeenCalledWith(
        '1',
        'New Electronics',
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error updating category',
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete category and return status 204', async () => {
      req.params = { id: '1' };
      (categoryService.deleteCategory as jest.Mock).mockResolvedValue(
        undefined,
      );

      await categoryController.deleteCategory(req as Request, res as Response);

      expect(categoryService.deleteCategory).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return status 500 on error', async () => {
      req.params = { id: '1' };
      (categoryService.deleteCategory as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await categoryController.deleteCategory(req as Request, res as Response);

      expect(categoryService.deleteCategory).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error deleting category',
      });
    });
  });
});
