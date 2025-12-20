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
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground";
    };

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
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-7xl mx-auto flex h-16 items-center px-4 justify-between">
                {/* 1. Mobile Menu Trigger (Left on Mobile) */}
                <div className="md:hidden mr-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* 2. Brand (Left/Center) */}
                <div className="flex items-center mr-4 md:mr-8">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
                        <Leaf className="h-6 w-6" />
                        <span>Grow Green</span>
                    </Link>
                </div>

                {/* 3. Navigation (Center - Desktop) */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-6">
                    <NavLinks />
                </div>

                {/* 4. Actions (Right) */}
                <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full h-9 w-9 text-foreground/80 hover:text-foreground"
                    >
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>

                    {!user?.isAdmin && (
                        <div className="relative group cursor-pointer mr-2" onClick={() => navigate('/cart')}>
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-foreground/80 hover:text-foreground">
                                <ShoppingCart className="h-4 w-4" />
                            </Button>
                            {cartCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full p-0 text-[10px] bg-primary text-primary-foreground pointer-events-none">
                                    {cartCount}
                                </Badge>
                            )}
                        </div>
                    )}

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none ring-offset-background transition-opacity hover:opacity-80">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold overflow-hidden">
                                    {user.username ? (
                                        user.username.charAt(0).toUpperCase()
                                    ) : (
                                        <User className="h-4 w-4" />
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.mobileNo || user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => window.location.href = (user.isAdmin ? '/admin/dashboard' : '/profile')}>
                                    <span className="w-full cursor-pointer">{user.isAdmin ? 'Dashboard' : 'Profile'}</span>
                                </DropdownMenuItem>
                                {user.isAdmin && (
                                    <>
                                        <DropdownMenuItem onClick={() => window.location.href = '/suppliers'}>Suppliers</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = '/farmers'}>Farmers</DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    clearCart();
                                    logout();
                                    navigate('/');
                                }} className="text-destructive focus:text-destructive cursor-pointer">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Link to="/register">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-md absolute w-full p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
                    <NavLinks mobile={true} closeMenu={() => setIsMobileMenuOpen(false)} />
                    {!user && (
                        <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
                            <Button variant="ghost" asChild onClick={() => setIsMobileMenuOpen(false)}>
                                <Link to="/login">Log in</Link>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
