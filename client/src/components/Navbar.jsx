import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, User, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path
            ? "text-primary font-semibold"
            : "text-foreground/80 hover:text-foreground";

    const NavLinks = ({ mobile = false, closeMenu }) => (
        <>
            <Link
                to="/"
                className={cn("transition-colors hover:text-primary", isActive('/'), mobile ? "py-2 text-lg" : "text-sm font-medium")}
                onClick={closeMenu}
            >
                Home
            </Link>

            <Link
                to="/marketplace"
                className={cn("transition-colors hover:text-primary", isActive('/marketplace'), mobile ? "py-2 text-lg" : "text-sm font-medium")}
                onClick={closeMenu}
            >
                Marketplace
            </Link>

            {user?.isAdmin && (
                <>
                    <Link
                        to="/suppliers"
                        className={cn("transition-colors hover:text-primary", isActive('/suppliers'), mobile ? "py-2 text-lg" : "text-sm font-medium")}
                        onClick={closeMenu}
                    >
                        Suppliers
                    </Link>
                    <Link
                        to="/farmers"
                        className={cn("transition-colors hover:text-primary", isActive('/farmers'), mobile ? "py-2 text-lg" : "text-sm font-medium")}
                        onClick={closeMenu}
                    >
                        Farmers
                    </Link>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container max-w-7xl mx-auto flex h-16 items-center px-4 justify-between">

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Leaf className="h-6 w-6" />
                    Grow Green
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6">
                    <NavLinks />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </Button>

                    {user && !user.isAdmin && (
                        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                            <ShoppingCart />
                            {cartCount > 0 && (
                                <Badge className="absolute -top-2 -right-2">
                                    {cartCount}
                                </Badge>
                            )}
                        </div>
                    )}

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                    {user.username?.[0]?.toUpperCase() || <User />}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {user.username}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate(user.isAdmin ? '/admin/dashboard' : '/profile')}>
                                    {user.isAdmin ? 'Dashboard' : 'Profile'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => {
                                        clearCart();
                                        logout();
                                        navigate('/');
                                    }}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden p-4 flex flex-col gap-4 border-t">
                    <NavLinks mobile closeMenu={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </nav>
    );
}
