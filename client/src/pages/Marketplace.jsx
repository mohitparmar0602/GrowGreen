import React from 'react';
import { Sprout, TrendingUp, Store, Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { getSuppliers, getAllProducts } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { Badge } from '../components/ui/badge';
import { ShoppingCart } from 'lucide-react';

export default function Marketplace() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const { addToCart } = useCart();

    const allProducts = getAllProducts();
    const filteredProducts = searchQuery
        ? allProducts.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
        )
        : [];

    if (searchQuery) {
        return (
            <div className="container py-8 px-4">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-green-600">
                        <Link to="/marketplace"><ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Categories</Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-green-950 dark:text-foreground">Search Results</h1>
                    <p className="text-slate-600 dark:text-muted-foreground mt-2">
                        Found {filteredProducts.length} results for "{searchQuery}"
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
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
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                            <Sprout className="h-16 w-16 text-slate-300 mb-4" />
                            <p className="text-lg">No products found matching your search.</p>
                            <Button variant="link" asChild className="mt-2">
                                <Link to="/marketplace">View all categories</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-16 px-4">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-green-950 dark:text-foreground">Marketplace Categories</h1>
                <p className="text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto text-lg">Select a category to browse our wide range of agricultural products.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <CategoryCard
                    icon={<Sprout className="h-8 w-8" />}
                    title="Seeds"
                    count="12 Items"
                    image="/seeds_collection.jpg"
                />
                <CategoryCard
                    icon={<TrendingUp className="h-8 w-8" />}
                    title="Fertilizers"
                    count="12 Items"
                    image="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=60"
                />
            </div>

            {/* Trusted Suppliers Section */}
            <div className="mt-24">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-foreground">Trusted Suppliers</h2>
                    <p className="text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto text-lg">
                        Partnering with certified providers to bring you quality agricultural inputs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {getSuppliers().map(supplier => (
                        <Card key={supplier.id} className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-600 border-border bg-card">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-xl">
                                        {supplier.name.charAt(0)}
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded text-amber-700 dark:text-amber-400 text-sm font-medium">
                                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                        {supplier.rating}
                                    </div>
                                </div>
                                <CardTitle className="mt-4 text-xl">{supplier.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center text-slate-500 dark:text-muted-foreground text-sm">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {supplier.location}
                                </div>
                                <div className="flex items-center text-green-700 dark:text-green-400 text-sm font-medium">
                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                    Verified Partner
                                </div>
                                <Button className="w-full bg-slate-900 hover:bg-green-600 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 transition-colors" asChild>
                                    <Link to={`/suppliers/${supplier.id}`}>View Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}


