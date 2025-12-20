import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllProducts, getSuppliers } from '../data/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, ArrowLeft, Loader2, MapPin, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SupplierDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [supplier, setSupplier] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const suppliers = getSuppliers();
            const foundSupplier = suppliers.find(s => s.id === id);

            if (foundSupplier) {
                setSupplier(foundSupplier);
                const allProducts = getAllProducts();
                const supplierProducts = allProducts.filter(p => p.supplierId === id);
                setProducts(supplierProducts);
            }
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!supplier) {
        return (
            <div className="container py-12 text-center">
                <h2 className="text-2xl font-bold text-red-600">Supplier Not Found</h2>
                <Button variant="ghost" asChild className="mt-4">
                    <Link to="/suppliers">Back to Suppliers</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container py-8 px-4 mx-auto max-w-7xl">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-green-600">
                <Link to="/suppliers"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Suppliers list</Link>
            </Button>

            {/* Supplier Header */}
            <div className="bg-green-50 dark:bg-background/50 border border-green-100 dark:border-border rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-green-950 dark:text-foreground">{supplier.name}</h1>
                        <Badge className="bg-green-600 hover:bg-green-700"><ShieldCheck className="h-3 w-3 mr-1" /> Verified</Badge>
                    </div>
                    <div className="flex items-center text-slate-600 dark:text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" /> {supplier.location}
                    </div>
                </div>
                <div className="bg-white dark:bg-card px-6 py-3 rounded-2xl shadow-sm border border-green-100 dark:border-border">
                    <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-muted-foreground font-bold mb-1">Total Products</span>
                    <span className="text-2xl font-bold text-green-700 dark:text-primary">{products.length} Items</span>
                </div>
            </div>

            {/* Products Grid */}
            <h2 className="text-2xl font-bold text-slate-900 dark:text-foreground mb-6">Products Offered</h2>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-muted/30 rounded-xl text-slate-500 dark:text-muted-foreground">
                    This supplier currently has no products listed.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
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
                                        <p className="text-sm text-muted-foreground">{product.supplier}</p>
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
                    ))}
                </div>
            )}
        </div>
    );
}
