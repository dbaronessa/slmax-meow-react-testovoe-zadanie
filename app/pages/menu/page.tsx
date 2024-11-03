"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger
} from '@/components/ui/sheet';

export type CoffeeProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  lastUpdated?: string; // Добавляем новое свойство как опциональное
};

export const coffeeProducts: CoffeeProduct[] = [
  {
    id: 1,
    name: "Espresso Blend",
    description:
      "Rich and bold espresso blend with notes of chocolate and caramel.",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Smooth, well-balanced coffee with a hint of nuttiness.",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Ethiopian Yirgacheffe",
    description: "Bright and complex with floral and citrus notes.",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "French Roast",
    description: "Dark roast with a smoky flavor and light acidity.",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export type CartItem = CoffeeProduct & {
  quantity: number; // Add quantity property for cart items
};

export default function CoffeeShop() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CoffeeProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Coffee Shop</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-2 text-sm font-medium">{cartCount}</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  Total: ${cartTotal.toFixed(2)}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffeeProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="text-center">
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center text-center">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover mb-4 rounded-md cursor-pointer"
                  />
                </Link>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => addToCart(product)} className="w-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
