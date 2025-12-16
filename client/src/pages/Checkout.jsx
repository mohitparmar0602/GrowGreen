import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function Checkout() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[80vh] py-10 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6 animate-pulse">
                <CreditCard className="h-16 w-16 text-green-700" />
            </div>
            <h1 className="text-4xl font-extrabold text-green-950 mb-4">Payment Gateway Coming Soon</h1>
            <p className="text-xl text-muted-foreground mb-8">
                We are working hard to bring you secure payments. Please check back later!
            </p>
            <Button asChild variant="outline">
                <Link to="/cart">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Link>
            </Button>
        </div>
    );
}
