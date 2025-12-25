import React from 'react';
import { Sprout, TrendingUp, Store, Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { getSuppliers } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Marketplace() {
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


