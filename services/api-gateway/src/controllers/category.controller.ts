import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import checkBody from '../utils/checkbody';

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error in getCategories controller:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategoryById(id);
    res.json(category);
  } catch (error) {
    console.error('Error in getCategoryById controller:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function createCategory(req: Request, res: Response) {
  const requiredFields = ['name'];
  const { name } = req.body;

  if (!checkBody(req.body, requiredFields)) {
    res.status(400).json({ error: 'Missing or empty fields' });
    return;
  }

  try {
    const category = await categoryService.createCategory(name);
    res.json(category);
  } catch (error) {
    console.error('Error in createCategory controller:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const category = await categoryService.deleteCategory(id);
    res.json(category);
  } catch (error) {
    console.error('Error in deleteCategory controller:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryService.updateCategory(id, name);
    res.json(category);
  } catch (error) {
    console.error('Error in updateCategory controller:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}
