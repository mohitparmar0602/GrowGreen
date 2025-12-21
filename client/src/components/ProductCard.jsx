import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 dark:border-border bg-card">
            <div className="aspect-square relative overflow-hidden bg-white dark:bg-muted p-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                    {product.category}
                </Badge>
            </div>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg text-green-950 dark:text-foreground">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                </p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold text-green-700 dark:text-primary">₹{product.price}</span>
                    <span className="text-sm text-gray-500 dark:text-muted-foreground">/{product.unit}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                    By {product.supplier} · Stock: {product.stock || '100+'}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
