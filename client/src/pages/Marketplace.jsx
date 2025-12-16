import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, Filter, Loader2 } from 'lucide-react';

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-green-950">Marketplace</h1>
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter:</span>
                    <div className="flex gap-2">
                        {['All', 'Seeds', 'Fertilizers'].map(cat => (
                            <Button
                                key={cat}
                                variant={filter === cat ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <Card className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                />
                <Badge className="absolute top-2 right-2 bg-white/90 text-green-800 hover:bg-white/100 backdrop-blur-sm">
                    {product.category}
                </Badge>
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{product.supplier}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
                <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.description}</p>
                <p className="text-xl font-bold text-green-700 mt-4">
                    ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
