import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Star, ShieldCheck } from 'lucide-react';
import { getSuppliers } from '../data/mockData';

export default function Suppliers() {
    const suppliers = getSuppliers();

    return (
        <div className="container py-12 px-4 mx-auto max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-green-950 mb-4">Our Trusted Suppliers</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    We partner with certified top-tier agricultural input providers to ensure you get the best quality for your farm.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suppliers.map(supplier => (
                    <Card key={supplier.id} className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-green-600">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                                    {supplier.name.charAt(0)}
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    {supplier.rating}
                                </div>
                            </div>
                            <CardTitle className="mt-4 text-xl">{supplier.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center text-slate-500 text-sm">
                                <MapPin className="h-4 w-4 mr-2" />
                                {supplier.location}
                            </div>
                            <div className="flex items-center text-green-700 text-sm font-medium">
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Verified Partner
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-green-600 transition-colors" asChild>
                                <Link to={`/suppliers/${supplier.id}`}>View Products</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
