import express from 'express';
import { CartController } from '../controller/cart.controller';

const CartRouter = express.Router();
const cartController = new CartController();

CartRouter.get('/:user_id', (req, res) => cartController.getUserCart(req, res));

CartRouter.delete('/:user_id', (req, res) =>
  cartController.removeCart(req, res),
);

CartRouter.post('/:user_id/add_item', (req, res) =>
  cartController.addItemToCart(req, res),
);

CartRouter.patch('/item/:cart_item_id', (req, res) =>
  cartController.updateItemFromCart(req, res),
);

CartRouter.delete('/item/:cart_item_id', (req, res) =>
  cartController.removeItemFromCart(req, res),
);

export default CartRouter;
