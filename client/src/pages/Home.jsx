import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Sprout, ShoppingBag, ShieldCheck, Star, TrendingUp, Truck } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden py-24 px-4 lg:py-32">
                <div className="container max-w-6xl flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1 space-y-8 text-center md:text-left">

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-green-950 leading-[1.1]">
                            Cultivating <span className="text-green-600">Success</span> Together
                        </h1>
                        <p className="text-lg text-slate-600 md:text-xl max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
                            Connect with trusted suppliers for premium seeds, fertilizers, and farming equipment. Empowering your harvest from sowing to established growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                            <Button size="lg" asChild className="text-lg h-12 px-8 bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-green-600/20 transition-all rounded-full">
                                <Link to="/marketplace">
                                    Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-8 flex items-center justify-center md:justify-start gap-8 text-sm font-medium text-slate-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <span>Verified Suppliers</span>
                            </div>

                        </div>
                    </div>
                    {/* Hero Image */}
                    <div className="flex-1 relative w-full max-w-lg md:max-w-none">
                        <div className="relative z-10 bg-white p-3 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
                            <img
                                src="/hero_modern_farming_uploaded.jpg"
                                alt="Modern Farming"
                                className="rounded-2xl w-full object-cover h-[450px]"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-200/40 to-emerald-200/40 blur-3xl rounded-full -z-10"></div>
                    </div>
                </div>
            </section>





            {/* Why Choose Us (Redesigned Features) */}
            <section className="py-24 bg-white">
                <div className="container max-w-6xl px-4 mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-950">Why Farmers Trust Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Sprout className="h-8 w-8 text-white" />}
                            title="High Quality Seeds"
                            description="Sourced from certified organic farms and top-tier labs for maximum yield."
                            color="bg-green-500"
                        />
                        <FeatureCard
                            icon={<ShoppingBag className="h-8 w-8 text-white" />}
                            title="Best Market Rates"
                            description="Direct-to-farmer pricing models without unnecessary middlemen."
                            color="bg-emerald-500"
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-8 w-8 text-white" />}
                            title="100% Secure"
                            description="Every supplier is vetted to ensure safety and reliability of inputs."
                            color="bg-teal-500"
                        />
                        <FeatureCard
                            icon={<Truck className="h-8 w-8 text-white" />}
                            title="Fast Delivery"
                            description="Reliable logistics network ensuring your supplies reach you on time."
                            color="bg-cyan-600"
                        />
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-24 bg-green-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container max-w-4xl px-4 text-center relative z-10 space-y-8 mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to boost your harvest?</h2>
                    <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Join today and get access to the best agricultural products at unbeatable prices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="px-8 text-lg h-12 text-green-900 font-bold hover:bg-green-100" asChild>
                            <Link to="/register">Create Free Account</Link>
                        </Button>

                    </div>
                </div>
            </section>
        </div>
    );
}



function FeatureCard({ icon, title, description, color }) {
    return (
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                <div className={`p-4 rounded-2xl shadow-md ${color} transform group-hover:-translate-y-2 transition-transform duration-300`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-green-950 mb-2">{title}</h3>
                    <p className="text-slate-600 leading-relaxed">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}


