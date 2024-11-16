import prisma from '../lib/prisma';

export class CartService {
  async createCart(userId: number) {
    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        cartItems: {
          create: [],
        },
      },
    });
    return cart;
  }

  async getCartFromUser(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    return cart;
  }

  async getCartWithItemsFromUser(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true, // Inclure les éléments du panier si nécessaire
      },
    });
    return cart;
  }

  async deleteCart(userId: number) {
    try {
      await prisma.cart.delete({
        where: {
          userId: userId,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
