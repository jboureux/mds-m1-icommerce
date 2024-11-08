import { db } from '../database';
import { slugify } from '../utils/constants';

export class CategoryService {
  async getCategories() {
    return await db.category.findMany();
  }

  async getCategoryById(id: string) {
    return await db.category.findUnique({
      where: {
        id,
      },
    });
  }

  async createCategory(name: string) {
    const slug = slugify(name);
    return await db.category.create({
      data: {
        name,
        slug,
      },
    });
  }

  async updateCategory(id: string, name: string) {
    const slug = slugify(name);
    return await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    });
  }

  async deleteCategory(id: string) {
    await db.category.delete({
      where: {
        id,
      },
    });
  }
}
