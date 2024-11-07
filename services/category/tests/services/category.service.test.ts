import request from 'supertest';
import express from 'express';
import { CategoryService } from '../../src/services/category.service';
import { db } from '../../src/database';
import { slugify } from '../../src/utils/constants';
// import { jest } from '@jest/globals';

jest.mock('../../src/services/category.service', () => ({
  CategoryService: jest.fn().mockImplementation(() => ({
    getCategories: jest.fn(),
    getCategoryById: jest.fn(),
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
  })),
}));
const app = express();
app.use(express.json());

const categoryService = new CategoryService();

app.get('/categories', categoryService.getCategories.bind(categoryService));
app.get(
  '/categories/:id',
  categoryService.getCategoryById.bind(categoryService),
);
app.post('/categories', categoryService.createCategory.bind(categoryService));
app.put(
  '/categories/:id',
  categoryService.updateCategory.bind(categoryService),
);
app.delete(
  '/categories/:id',
  categoryService.deleteCategory.bind(categoryService),
);

describe('CategoryService', () => {
  it('should get all categories', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(db.category.findMany).toHaveBeenCalled();
  });

  it('should get category by id', async () => {
    const mockCategory = {
      id: '1',
      name: 'Category 1',
      slug: 'category-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.mocked(db.category.findUnique).mockResolvedValueOnce(mockCategory);

    const response = await request(app).get('/categories/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
    expect(db.category.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should create a category', async () => {
    const mockCategory = {
      id: '121',
      name: 'Category 1',
      slug: slugify('Category 1'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.mocked(db.category.create).mockResolvedValueOnce(mockCategory);

    const response = await request(app)
      .post('/categories')
      .send({ name: 'New Category', slug: 'new-category' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCategory);
    expect(db.category.create).toHaveBeenCalledWith({
      data: { name: 'New Category', slug: 'new-category' },
    });
  });

  it('should update a category', async () => {
    const mockCategory = {
      id: '121',
      name: 'Category 13',
      slug: slugify('Category 13'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.mocked(db.category.update).mockResolvedValueOnce(mockCategory);

    const response = await request(app)
      .put('/categories/1')
      .send({ name: 'Updated Category', slug: 'updated-category' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
    expect(db.category.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'Updated Category', slug: 'updated-category' },
    });
  });

  it('should delete a category', async () => {
    const response = await request(app).delete('/categories/1');
    expect(response.status).toBe(204);
    expect(db.category.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
