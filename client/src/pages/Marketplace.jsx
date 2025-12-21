import React from 'react';
import { Sprout, TrendingUp } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';

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
        </div>
    );
}


