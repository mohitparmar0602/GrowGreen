
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CategoryProducts() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // Capitalize first letter for display
    const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                // Filter based on the category param
                // Note: The API returns all products, so we filter here. Do case-insensitive comparison if needed.
                const allProducts = response.data;
                const categoryProducts = allProducts.filter(p => p.category === displayCategory);
                setProducts(categoryProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, displayCategory]);

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-8 px-4">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-green-600">
                    <Link to="/marketplace"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories</Link>
                </Button>
                <h1 className="text-3xl font-bold text-green-950 dark:text-foreground">{displayCategory} Collection</h1>
                <p className="text-slate-600 dark:text-muted-foreground mt-2">Explore our wide range of {displayCategory.toLowerCase()}.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map(product => (
                        <Card key={product._id} className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-shadow bg-card border-border">
                            <div className="relative h-48 w-full overflow-hidden bg-white dark:bg-muted">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                                />
                                <Badge className="absolute top-2 right-2 bg-white/90 text-green-800 hover:bg-white/100 backdrop-blur-sm dark:bg-black/50 dark:text-green-400 dark:hover:bg-black/70">
                                    {product.category}
                                </Badge>
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                                        <p className="text-sm text-green-600 dark:text-primary font-medium">{product.supplier}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex-1">
                                <p className="text-sm text-gray-600 dark:text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
                                <p className="text-xl font-bold text-green-700 dark:text-primary mt-4">
                                    ₹{product.price} <span className="text-sm font-normal text-gray-500 dark:text-muted-foreground">/ {product.unit}</span>
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full" onClick={() => addToCart(product)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
