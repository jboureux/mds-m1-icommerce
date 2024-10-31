import { CategoryService } from '../services/category.service';
import { Request, Response } from 'express';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  getCategories(req: Request, res: Response) {
    return this.categoryService.getCategories(req, res);
  }

  getCategoryById(req: Request, res: Response) {
    return this.categoryService.getCategoryById(req, res);
  }

  createCategory(req: Request, res: Response) {
    return this.categoryService.createCategory(req, res);
  }

  updateCategory(req: Request, res: Response) {
    return this.categoryService.updateCategory(req, res);
  }

  deleteCategory(req: Request, res: Response) {
    return this.categoryService.deleteCategory(req, res);
  }
}
