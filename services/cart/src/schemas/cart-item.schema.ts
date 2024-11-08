import { z } from 'zod';

const cart_item_schema = z.object({
  id: z.coerce.number(),
  cartId: z.coerce.number(),
  productId: z.coerce.number(),
  quantity: z.coerce.number().positive(),
});

export default cart_item_schema;
