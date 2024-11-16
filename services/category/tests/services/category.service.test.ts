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
    it('should return categories', async () => {
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

      const categories = await categoryService.getCategories();

      expect(findManySpy).toHaveBeenCalled();
      expect(categories).toEqual(mockCategories);
    });

    it('should throw an error if fetching categories fails', async () => {
      findManySpy.mockRejectedValue(new Error('Database error'));

      await expect(categoryService.getCategories()).rejects.toThrow(
        'Database error',
      );
      expect(findManySpy).toHaveBeenCalled();
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by id', async () => {
      const mockCategory = {
        id: 'cuid_123',
        name: 'Electronics',
        slug: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      findUniqueSpy.mockResolvedValue(mockCategory);

      const category = await categoryService.getCategoryById('cuid_123');

      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 'cuid_123' } });
      expect(category).toEqual(mockCategory);
    });

    it('should throw an error if fetching category by id fails', async () => {
      findUniqueSpy.mockRejectedValue(new Error('Database error'));

      await expect(categoryService.getCategoryById('cuid_123')).rejects.toThrow(
        'Database error',
      );
      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 'cuid_123' } });
    });
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const mockCategory = {
        id: 'cuid_123',
        name: 'Electronics',
        slug: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      createSpy.mockResolvedValue(mockCategory);

      const category = await categoryService.createCategory('Electronics');

      expect(createSpy).toHaveBeenCalledWith({
        data: { name: 'Electronics', slug: 'electronics' },
      });
      expect(category).toEqual(mockCategory);
    });

    it('should throw an error if creating category fails', async () => {
      createSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        categoryService.createCategory('Electronics'),
      ).rejects.toThrow('Database error');
      expect(createSpy).toHaveBeenCalledWith({
        data: { name: 'Electronics', slug: 'electronics' },
      });
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const mockCategory = {
        id: 'cuid_123',
        name: 'New Electronics',
        slug: 'new-electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      updateSpy.mockResolvedValue(mockCategory);

      const category = await categoryService.updateCategory(
        'cuid_123',
        'New Electronics',
      );

      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 'cuid_123' },
        data: { name: 'New Electronics', slug: 'new-electronics' },
      });
      expect(category).toEqual(mockCategory);
    });

    it('should throw an error if updating category fails', async () => {
      updateSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        categoryService.updateCategory('cuid_123', 'New Electronics'),
      ).rejects.toThrow('Database error');
      expect(updateSpy).toHaveBeenCalledWith({
        where: { id: 'cuid_123' },
        data: { name: 'New Electronics', slug: 'new-electronics' },
      });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      deleteSpy.mockResolvedValue(undefined);

      await categoryService.deleteCategory('cuid_123');

      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: 'cuid_123' } });
    });

    it('should throw an error if deleting category fails', async () => {
      deleteSpy.mockRejectedValue(new Error('Database error'));

      await expect(categoryService.deleteCategory('cuid_123')).rejects.toThrow(
        'Database error',
      );
      expect(deleteSpy).toHaveBeenCalledWith({ where: { id: 'cuid_123' } });
    });
  });
});
