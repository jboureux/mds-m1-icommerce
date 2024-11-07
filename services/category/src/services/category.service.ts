import { db } from '../database';
import { Request, Response } from 'express';
import { slugify } from '../utils/constants';

export class CategoryService {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await db.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error fetching categories' });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await db.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Error fetching category' });
    }
  }

  async createCategory(req: Request, res: Response) {
    const { name } = req.body;
    const slug = slugify(name);
    try {
      const category = await db.category.create({
        data: {
          name,
          slug,
        },
      });
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Error creating category' });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const slug = slugify(name);
    try {
      const category = await db.category.update({
        where: {
          id,
        },
        data: {
          name,
          slug,
        },
      });
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Error updating category' });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.category.delete({
        where: {
          id,
        },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Error deleting category' });
    }
  }
}
