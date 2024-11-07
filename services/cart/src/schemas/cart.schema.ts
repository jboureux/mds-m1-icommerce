import { z } from 'zod';

const cart_schema = z.object({
  id: z.coerce.number(),
  userId: z.coerce.number(),
});

export default cart_schema;
