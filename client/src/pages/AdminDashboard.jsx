import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getSuppliers, getStockData } from '../data/mockData';
import { Users, Package, TrendingUp, IndianRupee, Store, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';

export default function AdminDashboard() {
    const suppliers = getSuppliers();
    const stock = getStockData();
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [isLowStockOpen, setIsLowStockOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders');
                setOrders(res.data);

                const revenues = {};
                res.data.forEach(order => {
                    const date = new Date(order.date);
                    const month = date.toLocaleString('default', { month: 'short' });
                    revenues[month] = (revenues[month] || 0) + order.totalAmount;
                });

                const formattedRevenue = Object.keys(revenues).map(month => ({
                    month,
                    revenue: revenues[month]
                }));
                setRevenueData(formattedRevenue.length > 0 ? formattedRevenue : [{ month: 'Current', revenue: 0 }]);

            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/users');
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchOrders();
        fetchUsers();
    }, []);

    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const lowStockItems = stock.filter(s => s.status === 'Low Stock' || s.status === 'Out of Stock');

    return (
        <div className="container py-8 px-4 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-green-950 dark:text-foreground mb-8">Admin Dashboard</h1>

            {/* Key Metrics & Detailed Views Combined */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Total Revenue & Overview Combined */}
                <Card className="col-span-1 lg:col-span-2 shadow-sm border-green-100">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Total Revenue</CardTitle>
                                <CardDescription>Financial Performance</CardDescription>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="text-3xl font-bold flex items-center gap-2">
                                    <IndianRupee className="h-6 w-6 text-green-600" />
                                    ₹{totalRevenue.toLocaleString()}
                                </div>
                                <p className="text-sm text-muted-foreground">+20.1% from last month</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-4 space-y-4">
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Revenue Overview</h4>
                            {revenueData.length === 0 && <p className="text-sm text-gray-500">No revenue data available.</p>}
                            {revenueData.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 text-sm text-slate-500 font-medium">{item.month}</div>
                                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-600 rounded-full"
                                            style={{ width: `${(item.revenue / 80000) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-sm font-bold w-20 text-right">₹{(item.revenue / 1000).toFixed(1)}k</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Suppliers Combined */}
                <Card className="col-span-1 shadow-sm border-amber-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle>Suppliers</CardTitle>
                            <CardDescription>Partner Network</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                            <Store className="h-4 w-4" />
                            {suppliers.length} Active
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 space-y-3 max-h-[300px] overflow-auto pr-2">
                            {suppliers.map(s => (
                                <div key={s.id} className="p-3 border rounded-lg flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="font-bold text-slate-800">{s.name}</div>
                                        <div className="text-xs text-slate-500">{s.location}</div>
                                    </div>
                                    <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                                        ★ {s.rating}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Low Stock Items (Clickable) */}
                <Card
                    className="col-span-1 shadow-sm border-red-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setIsLowStockOpen(true)}
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle>Low Stock Items</CardTitle>
                            <CardDescription>Inventory Alerts</CardDescription>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <div className="text-4xl font-bold text-red-700">
                                {lowStockItems.length}
                            </div>
                            <p className="text-sm text-red-600/80 font-medium mt-1">Items below threshold</p>
                            <p className="text-xs text-muted-foreground mt-4 underline">Click to view details</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Status (Full List) - Optional, keep or remove? User didn't ask to remove inventory status, but low stock interaction covers alerts. */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Inventory Status</CardTitle>
                        <CardDescription>Real-time stock levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[400px] overflow-auto">
                            {stock.map((item, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 hover:bg-muted/50 p-2 rounded transition-colors">
                                    <div className="font-medium">{item.product}</div>
                                    <div className={`text-sm font-bold px-2 py-1 rounded ${item.status === 'In Stock' ? 'bg-green-500/15 text-green-700 dark:text-green-400' :
                                        item.status === 'Low Stock' ? 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400' :
                                            'bg-destructive/15 text-destructive dark:text-red-400'
                                        }`}>
                                        {item.status} ({item.stock})
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Registered Farmers List - Originally implemented, keeping it. */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Registered Farmers</CardTitle>
                        <CardDescription>Recently registered users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {users.length === 0 && <p className="text-sm text-gray-500">No registered farmers yet.</p>}
                            {users.map((user) => (
                                <div key={user._id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{user.username}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Joined {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Low Stock Dialog */}
            <Dialog open={isLowStockOpen} onOpenChange={setIsLowStockOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-red-700 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Low Stock Alerts
                        </DialogTitle>
                        <DialogDescription>
                            The following items are running low or out of stock.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        {lowStockItems.length === 0 ? (
                            <p className="text-center text-muted-foreground">All items are sufficiently stocked.</p>
                        ) : (
                            lowStockItems.map((item, i) => {
                                const isOutOfStock = item.stock <= 0;
                                return (
                                    <div key={i} className={`flex justify-between items-center p-4 border rounded-xl transition-all ${isOutOfStock ? 'bg-red-50/50 border-red-100' : 'bg-amber-50/50 border-amber-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isOutOfStock ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {isOutOfStock ? <AlertCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 dark:text-slate-100">{item.product}</p>
                                                <p className={`text-xs font-medium uppercase tracking-wide ${isOutOfStock ? 'text-red-600' : 'text-amber-600'}`}>
                                                    {item.status}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={`px-3 py-1 text-sm font-bold border-2 ${isOutOfStock ? 'bg-white border-red-100 text-red-700' : 'bg-white border-amber-100 text-amber-700'}`}>
                                            {item.stock} Units
                                        </Badge>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
