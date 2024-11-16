import prisma from '../lib/prisma';

export class CartItemService {
  async createItemInCart({
    cartId,
    productId,
    quantity,
  }: {
    cartId: number;
    productId: number;
    quantity: number;
  }) {
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cartId,
        product: productId,
        quantity: quantity,
      },
    });
    return cartItem;
  }

  async deleteCartItem(cartItemId: number) {
    try {
      await prisma.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    try {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: {
          quantity: quantity,
        },
      });
      return updatedCartItem;
    } catch {
      return null;
    }
  }
}
