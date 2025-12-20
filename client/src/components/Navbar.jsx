import React from 'react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
    const { cartCount, clearCart } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Leaf className="h-6 w-6" />
                    <span>Grow Green</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-primary">
                        Shopping
                    </Link>

                    {user?.isAdmin && (
                        <>
                            <Link to="/suppliers" className="text-sm font-medium transition-colors hover:text-primary">
                                Suppliers
                            </Link>
                            <Link to="/farmers" className="text-sm font-medium transition-colors hover:text-primary">
                                Farmers
                            </Link>
                        </>
                    )}

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors" title={user.username}>
                                    <User className="h-5 w-5" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => window.location.href = (user.isAdmin ? '/admin/dashboard' : '/profile')}>
                                    <span className="w-full">{user.isAdmin ? 'Dashboard' : 'Profile'}</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    clearCart();
                                    logout();
                                }} className="text-red-600 focus:text-red-600">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
                                Login
                            </Link>
                            <Link to="/register" className="text-sm font-medium transition-colors hover:text-primary">
                                Sign Up
                            </Link>
                        </>
                    )}

                    {!user?.isAdmin && (
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
                    )}
                </div>
            </div>
        </nav>
    );
}
