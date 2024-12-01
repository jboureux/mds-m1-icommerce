import axios from 'axios'

export async function getAllProductsController() {
    try {
        const response = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/product`,
        )
        return response.data
    } catch (error) {
        throw new Error(`Failed to get products: ${(error as Error).message}`)
    }
}

export async function getProductByIdController(id: string) {
    try {
        const response = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/product/${id}`,
        )
        return response.data
    } catch (error) {
        throw new Error(`Failed to get product: ${(error as Error).message}`)
    }
}

export async function createProductController(name: string) {
    try {
      const response = await axios.post(
        `${process.env.PRODUCT_SERVICE_URL}/product`,
        {
          name,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create product: ${(error as Error).message}`);
    }
  }
  
  export async function updateProductController(id: string, name: string) {
    try {
      const response = await axios.put(
        `${process.env.PRODUCT_SERVICE_URL}/product/${id}`,
        {
          name,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update product: ${(error as Error).message}`);
    }
  }

  export async function deleteProductController(id: string) {
    try {
      const response = await axios.delete(
        `${process.env.PRODUCT_SERVICE_URL}/product/${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete product: ${(error as Error).message}`);
    }
  }
  