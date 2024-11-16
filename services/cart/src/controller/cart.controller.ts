import { Request, Response } from 'express';
import cart_item_schema from '../schemas/cart-item.schema';
import cart_schema from '../schemas/cart.schema';
import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../services/cart.service';

export class CartController {
  constructor(
    private cartService = new CartService(),
    private cartItemService = new CartItemService(),
  ) {}

  async getUserCart(req: Request, res: Response) {
    if (
      cart_schema
        .pick({ userId: true })
        .safeParse({ userId: req.params.user_id }).success === false
    ) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const cart = await this.cartService.getCartWithItemsFromUser(
      parseInt(req.params.user_id),
    );

    if (!cart) {
      res
        .status(404)
        .json({ message: `There is no Cart for user ${req.params.user_id}` });
      return;
    }

    res.status(200).json({
      message: `Successfully retrieved Cart of user ${req.params.user_id}`,
      data: cart,
    });
  }

  async removeCart(req: Request, res: Response) {
    if (
      cart_schema
        .pick({ userId: true })
        .safeParse({ userId: req.params.user_id }).success === false
    ) {
      res
        .status(400)
        .json({ message: 'User ID is required.', data: { success: false } });
      return;
    }

    const cartDeleted = await this.cartService.deleteCart(
      parseInt(req.params.user_id),
    );

    if (!cartDeleted) {
      res.status(500).json({
        message: 'An error happend on the server while deleting the Cart',
        data: { success: false },
      });
      return;
    }

    res.status(200).json({
      message: `Cart of user ${req.params.user_id} deleted successfully`,
      data: { success: true },
    });
  }

  async addItemToCart(req: Request, res: Response) {
    if (
      cart_schema
        .pick({ userId: true })
        .safeParse({ userId: req.params.user_id }).success === false
    ) {
      res.status(400).json({ message: 'User ID is required.' });
      return;
    }

    const filteredCartItemSchema = cart_item_schema.pick({
      productId: true,
      quantity: true,
    });
    const parsedBody = filteredCartItemSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({
        message:
          'The body is missing the required attributes (productId, quantity)',
      });
      return;
    }

    const { quantity, productId } = parsedBody.data;
    const userId = parseInt(req.params.user_id);

    let cart = await this.cartService.getCartFromUser(userId);

    if (!cart) {
      cart = await this.cartService.createCart(userId);
    }

    const cartItem = await this.cartItemService.createItemInCart({
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
    });

    res.status(201).json({
      message: `Item successfuly added to user ${req.params.user_id} 's Cart`,
      data: cartItem,
    });
  }

  async removeItemFromCart(req: Request, res: Response) {
    if (
      cart_item_schema
        .pick({ id: true })
        .safeParse({ id: req.params.cart_item_id }).success === false
    ) {
      res.status(400).json({ message: 'Item ID is required.' });
      return;
    }

    const cartItemDeleted = await this.cartItemService.deleteCartItem(
      parseInt(req.params.cart_item_id),
    );

    if (!cartItemDeleted) {
      res.status(500).json({
        message:
          'An error happened on the server while deleting the item from the Cart',
        data: { success: false },
      });
      return;
    }

    res.status(200).json({
      message: `Item deleted successfully from the Cart of user ${req.params.user_id}`,
      data: { success: true },
    });
  }

  async updateItemFromCart(req: Request, res: Response) {
    if (
      cart_item_schema
        .pick({ id: true })
        .safeParse({ id: req.params.cart_item_id }).success === false
    ) {
      res.status(400).json({ message: 'Item ID is required.' });
      return;
    }

    const filteredQuantitySchema = cart_item_schema.pick({ quantity: true });
    const parsedBody = filteredQuantitySchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(400).json({ message: 'Quantity must be a positive number.' });
      return;
    }
    const { quantity } = parsedBody.data;

    const cartItem = await this.cartItemService.updateCartItemQuantity(
      parseInt(req.params.cart_item_id),
      quantity,
    );

    if (!cartItem) {
      res.status(500).json({
        message:
          'An error happened on the server while updating the item in the Cart',
        data: { success: false },
      });
      return;
    }

    res.status(200).json({
      message: `Item quantity updated successfully in the Cart of user ${req.params.user_id}`,
      data: cartItem,
    });
  }
}
