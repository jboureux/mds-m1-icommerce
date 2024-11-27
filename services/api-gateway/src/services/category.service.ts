import axios from 'axios';

export async function getAllCategories() {
  try {
    const response = await axios.get(
      `${process.env.CATEGORY_SERVICE_URL}/category`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get categories: ${(error as Error).message}`);
  }
}

export async function getCategoryById(id: string) {
  try {
    const response = await axios.get(
      `${process.env.CATEGORY_SERVICE_URL}/category/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get category: ${(error as Error).message}`);
  }
}

export async function createCategory(name: string) {
  try {
    const response = await axios.post(
      `${process.env.CATEGORY_SERVICE_URL}/category`,
      {
        name,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create category: ${(error as Error).message}`);
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.CATEGORY_SERVICE_URL}/category/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete category: ${(error as Error).message}`);
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const response = await axios.put(
      `${process.env.CATEGORY_SERVICE_URL}/category/${id}`,
      {
        name,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update category: ${(error as Error).message}`);
  }
}
