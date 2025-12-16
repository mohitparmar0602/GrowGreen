import React from 'react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Leaf className="h-6 w-6" />
                    <span>AgriMarket</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
                        Marketplace
                    </Link>
                    <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
                        Login
                    </Link>
                    <Link to="/register" className="text-sm font-medium transition-colors hover:text-primary">
                        Sign Up
                    </Link>
                    <Link to="/cart" className="relative transition-colors hover:text-primary group">
                        <div className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] bg-red-600 text-white hover:bg-red-700">
                                    {cartCount}
                                </Badge>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
