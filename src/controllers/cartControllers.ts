import { Request, Response } from "express";
import prisma from "../models/prismaClient";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const { userId, gameId, physical } = req.body;
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {
      res.status(200).json({ error: "Game not found" });
      return;
    }

    let cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
        status: "pending",
      },
      include: {
        cartitem: true,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId,
          createDate: new Date(),
          status: "pending",
        },
      });
    }

    /* const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        gameId: gameId,
        physical: physical,
      },
    }); */
    const existingCartItem = cart.cartitem.find((item: { gameId: number; physical: boolean }) => item.gameId === gameId);
    
    if (existingCartItem) {
      if (existingCartItem.physical === physical) {
        res.status(200).json({ message: "Game already in cart" });
        return;
      }
    }
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        gameId,
        physical,
      },
    });

    const updateCart = await prisma.cart.findUnique({
      where: {
        id: cart.id,
      },
      include: { cartitem: { include: { game: true } } },
    });
    res.status(200).json(updateCart)
  } catch (error) {
    res.status(500).json({ error: "Error add to cart" });
  }
};

export const removeFromCart = async (req: Request, res: Response):Promise<void> => {
  const {cartItemId} = req.body

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId
      },
      include: {
        cart: {
          include: {
            cartitem:true
          }
        }
      }
    })
    if(!cartItem){
      res.status(200).json({error: "Not found cart item"})
      return;
    }
    await prisma.cartItem.delete({
      where: {
        id: cartItemId
      }
    })

    const cartId = cartItem.cart.id;
    const countCartItem = await prisma.cartItem.count({
      where: {
        cartId: cartId
      }
    })

    if(countCartItem === 0){
      await prisma.cart.delete({
        where: {
          id:cartId
        }
      })
    }

    const updatedCart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartitem: {
          include: {
            game: true,
          },
        },
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error removing item from cart" });
  }
}

export const fetchCart = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: Number(userId),
        status: "pending",
      },
      include: {
        cartitem: {
          include: {
            game: true,
          },
        },
      },
    });

    if (!cart) {
      res.status(200).json(null);
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
};


export const totalCart = async (req:Request, res: Response):Promise<void> => {
  const {userId} = req.params
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        userId: Number(userId),
        status: 'pending'
      },
      include: {
        cartitem: {
          include: {
            game: true,
          },
        },
      },
    })

    if(!userCart){
      res.status(200).json({error: "No user cart"})
      return;
    }

    let total = 0

    for(const cartItem of userCart.cartitem){
      const game = cartItem.game
      let priceToUse = game.price;
      if(game.discountPercent > 0 && game.discountPrice > 0){
        priceToUse = game.discountPrice;
      }
      total += priceToUse
    }

    res.status(200).json(total)
  } catch (error) {
    res.status(500).json({ error: "Error calculation cart" });
  }
}