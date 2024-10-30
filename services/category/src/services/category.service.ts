import { db } from '../database';
import { Request, Response } from 'express';

export class CategoryService {
  async getCategories(req: Request, res: Response) {
    const categories = await db.category.findMany();

    res.status(200).json(categories);
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(category);
  }

  async createCategory(req: Request, res: Response) {
    const { name, slug } = req.body;
    const category = await db.category.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json(category);
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name, slug } = req.body;
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
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    await db.category.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  }
}
