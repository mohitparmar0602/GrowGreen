import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Mail, Shield, Calendar, Package, ShoppingBag, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import { Badge } from '../components/ui/badge';

export default function Profile() {
    const { user, logout, updateProfile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        username: '',
        mobileNo: ''
    });

    useEffect(() => {
        if (user) {
            setEditForm({
                username: user.username || '',
                mobileNo: user.mobileNo || ''
            });
        }
    }, [user]);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        const result = await updateProfile(user.id, editForm);
        if (result.success) {
            setIsEditing(false);
            // Optionally add toast notification here
        } else {
            alert('Failed to update profile: ' + result.message);
        }
        setIsSaving(false);
    };

    useEffect(() => {
        if (user?.email) {
            const fetchOrders = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/orders/user/${user.email}`);
                    setOrders(res.data);
                } catch (err) {
                    console.error("Failed to fetch orders:", err);
                } finally {
                    setLoadingOrders(false);
                }
            };
            fetchOrders();
        }
    }, [user]);

    // Fallback if user is null
    if (!user) {
        return <div className="p-8 text-center">Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="md:col-span-1">
                    <Card className="w-full shadow-lg border-green-100 dark:border-border">
                        <CardHeader className="bg-green-50/50 dark:bg-card text-center border-b border-green-100 dark:border-border pb-8 pt-8">
                            <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-background shadow-sm">
                                <span className="text-4xl font-bold text-green-700 dark:text-primary">
                                    {user.username ? user.username.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
                                </span>
                            </div>
                            <CardTitle className="text-2xl font-bold text-green-950 dark:text-foreground">{user.username}</CardTitle>
                            <CardDescription className="text-green-700 dark:text-muted-foreground font-medium">
                                {user.isAdmin ? 'Administrator' : 'Farmer / Customer'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Username</label>
                                        <input
                                            type="text"
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Mobile Number</label>
                                        <input
                                            type="tel"
                                            value={editForm.mobileNo}
                                            onChange={(e) => setEditForm({ ...editForm, mobileNo: e.target.value })}
                                            placeholder="+91 9876543210"
                                            className="w-full p-2 rounded-md border border-input bg-background"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button onClick={handleSaveProfile} disabled={isSaving} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </Button>
                                        <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving} className="flex-1">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="p-2 bg-card rounded-md shadow-sm">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Email Address</p>
                                            <p className="text-sm font-semibold text-foreground">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="p-2 bg-card rounded-md shadow-sm">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Mobile Number</p>
                                            <p className="text-sm font-semibold text-foreground">
                                                {user.mobileNo || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="p-2 bg-card rounded-md shadow-sm">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Shipping Address</p>
                                            <p className="text-sm font-semibold text-foreground whitespace-pre-wrap">
                                                {user.address || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="p-2 bg-card rounded-md shadow-sm">
                                            <Shield className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Account Type</p>
                                            <p className="text-sm font-semibold text-foreground">
                                                {user.isAdmin ? 'Admin Access' : 'Standard User'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                                        <div className="p-2 bg-card rounded-md shadow-sm">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">Member Since</p>
                                            <p className="text-sm font-semibold text-foreground">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20">
                                        Edit Profile Details
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-2 pb-6 flex justify-center">
                            <Button
                                variant="destructive"
                                onClick={logout}
                                className="w-full"
                            >
                                Sign Out
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Purchase History Section */}
                <div className="md:col-span-2">
                    <Card className="shadow-lg border-green-100 dark:border-border h-full">
                        <CardHeader className="border-b border-green-50 dark:border-border bg-green-50/20 dark:bg-muted/20">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-6 w-6 text-green-700 dark:text-primary" />
                                <CardTitle className="text-xl text-green-950 dark:text-foreground">Purchase History</CardTitle>
                            </div>
                            <CardDescription>View your past orders and their status</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {loadingOrders ? (
                                <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                            <div className="space-y-1 mb-4 sm:mb-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-foreground">Order #{order._id.slice(-6).toUpperCase()}</span>
                                                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? 'bg-green-600' : ''}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {order.products.length} {order.products.length === 1 ? 'Item' : 'Items'}
                                                </div>
                                                {order.shippingAddress && (
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        <span className="font-semibold">Delivering to:</span> {order.shippingAddress.city}, {order.shippingAddress.state}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-lg font-bold text-green-700 dark:text-primary">₹{order.totalAmount}</span>
                                                <Button variant="outline" size="sm" className="text-xs">
                                                    <Package className="h-3 w-3 mr-2" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 flex flex-col items-center">
                                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                        <ShoppingBag className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">No orders yet</h3>
                                    <p className="text-muted-foreground max-w-sm mt-2">
                                        You haven't made any purchases yet. Browse the marketplace to find fresh seeds and supplies.
                                    </p>
                                    <Button className="mt-6 bg-green-600 hover:bg-green-700" onClick={() => window.location.href = '/marketplace'}>
                                        Start Shopping
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
