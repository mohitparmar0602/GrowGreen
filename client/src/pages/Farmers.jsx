import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getFarmers } from '../data/mockData';
import { User, Phone, MapPin, Sprout } from 'lucide-react';

export default function Farmers() {
    const farmers = getFarmers();

    return (
        <div className="container py-12 px-4 mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold text-green-950 dark:text-foreground mb-8">Registered Farmers</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Farmer Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Location</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Primary Crop</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Contact</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {farmers.map((farmer) => (
                                    <tr key={farmer.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                {farmer.name}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-muted-foreground">
                                                <MapPin className="h-4 w-4" /> {farmer.location}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-muted-foreground">
                                                <Sprout className="h-4 w-4" /> {farmer.crop}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-muted-foreground">
                                                <Phone className="h-4 w-4" /> {farmer.contact}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
