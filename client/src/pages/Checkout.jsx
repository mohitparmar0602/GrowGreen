import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login to place an order.");
            navigate('/login');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderData = {
                customerName: user.username || user.email,
                customerEmail: user.email,
                products: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal,
                shippingAddress: formData
            };

            await axios.post('http://localhost:5000/api/orders', orderData);

            clearCart();
            alert("Order placed successfully!");
            navigate('/marketplace');
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (cart.length === 0) {
        navigate('/marketplace');
        return null;
    }

    return (
        <div className="container py-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-green-950 mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Street Address</label>
                                <Input required name="street" value={formData.street} onChange={handleChange} placeholder="123 Farm Lane" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <Input required name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <Input required name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                                    <Input required name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="400001" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <Input required name="country" value={formData.country} onChange={handleChange} placeholder="India" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="bg-green-50/50">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={isPlacingOrder}>
                            {isPlacingOrder ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
