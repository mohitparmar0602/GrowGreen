import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getSuppliers, getFarmers, getStockData } from '../data/mockData';
import { Users, Package, TrendingUp, IndianRupee, Store, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const suppliers = getSuppliers();
    const farmers = getFarmers();
    const stock = getStockData();
    const [orders, setOrders] = useState([]);
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders');
                setOrders(res.data);

                // Calculate Revenue Per Month (Simple aggregate)
                // For now, let's just make a simple aggregate for the UI
                // In production, aggregate on backend.
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
        fetchOrders();
    }, []);

    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return (
        <div className="container py-8 px-4 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-green-950 dark:text-foreground mb-8">Admin Dashboard</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{farmers.length}</div>
                        <p className="text-xs text-muted-foreground">+180 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                        <Store className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{suppliers.length}</div>
                        <p className="text-xs text-muted-foreground">Across 5 states</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stock.filter(s => s.status === 'Low Stock' || s.status === 'Out of Stock').length}
                        </div>
                        <p className="text-xs text-muted-foreground">Needs attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Inventory Status */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Inventory Status</CardTitle>
                        <CardDescription>Real-time stock levels</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
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

                {/* Recent Revenue */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Monthly revenue performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
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

                {/* Suppliers List */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Partner Suppliers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suppliers.map(s => (
                                <div key={s.id} className="p-4 border rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div>
                                        <div className="font-bold text-green-950">{s.name}</div>
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
            </div>
        </div>
    );
}
