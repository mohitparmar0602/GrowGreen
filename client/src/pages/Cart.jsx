import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Plus, Minus, ArrowRight, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

    const handlePlaceOrder = async () => {
        if (!user) {
            alert("Please login to place an order.");
            navigate('/login');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderData = {
                customerName: user.username || user.email, // Fallback if username missing
                customerEmail: user.email,
                products: cart.map(item => ({
                    product: item._id, // Assuming item._id is the product ID
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal
            };

            await axios.post('http://localhost:5000/api/orders', orderData);

            clearCart();
            alert("Order placed successfully!");
            navigate('/marketplace'); // Redirect to marketplace or orders page
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-green-50 dark:bg-primary/20 p-6 rounded-full mb-6">
                    <Trash2 className="h-12 w-12 text-green-600 dark:text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-green-950 dark:text-foreground mb-2">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-8 text-lg max-w-md">
                    Looks like you haven't added any agricultural inputs yet. Start browsing to grow your farm!
                </p>
                <Button size="lg" asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <Link to="/marketplace">Start Shopping <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container py-10 px-4">
            <h1 className="text-3xl font-bold text-green-950 dark:text-foreground mb-8">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <Card key={item._id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.src = 'https://placehold.co/200?text=No+Image'; }}
                                />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.unit}</p>
                                <p className="text-green-700 dark:text-primary font-bold mt-1">₹{item.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="text-right min-w-[80px]">
                                <p className="font-bold">₹{item.price * item.quantity}</p>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeFromCart(item._id)}
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </Card>
                    ))}
                    <div className="flex justify-end">
                        <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <Card className="bg-green-50/50 dark:bg-muted/50 border-green-100 dark:border-border shadow-md">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                                Proceed to Checkout
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
