import { CategoryService } from '../services/category.service';
import { Request, Response } from 'express';
import { z } from 'zod';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error fetching categories' });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Error fetching category' });
    }
  }

  async createCategory(req: Request, res: Response) {
    const categorySchema = z.object({
      name: z.string().min(1).max(50),
    });

    try {
      const { name } = await categorySchema.parseAsync(req.body);
      const category = await this.categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues });
      }
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Error creating category' });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const categorySchema = z.object({
      name: z.string().min(1).max(50),
    });

    try {
      const { name } = await categorySchema.parseAsync(req.body);
      const category = await this.categoryService.updateCategory(id, name);
      res.status(200).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues });
      }
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Error updating category' });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Error deleting category' });
    }
  }
}
