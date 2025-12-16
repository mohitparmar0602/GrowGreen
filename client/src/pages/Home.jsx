import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Sprout, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden py-20 px-4">
                <div className="container max-w-5xl flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="flex-1 space-y-6 text-center md:text-left bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-green-950">
                            Grow Better with <span className="text-primary">Premium</span> Seeds & Fertilizers
                        </h1>
                        <p className="text-lg text-green-900 md:text-xl max-w-2xl font-medium">
                            Connect directly with verified suppliers. Ensure transparency, quality, and affordability for your farm's success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                            <Button size="lg" asChild className="text-lg px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 border-0">
                                <Link to="/marketplace">
                                    Browse Marketplace <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 border-green-600 text-green-700 hover:bg-green-50" asChild>
                                <a href="#features">
                                    Learn More
                                </a>
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Image/Graphic */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop&q=80"
                                alt="Farming"
                                className="rounded-xl w-full object-cover h-[400px]"
                            />
                        </div>
                        <div className="absolute top-10 -right-10 rounded-full bg-green-200/50 w-72 h-72 blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 rounded-full bg-amber-200/50 w-72 h-72 blur-3xl -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-green-950">Why Choose AgriMarket?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Sprout className="h-10 w-10 text-primary" />}
                            title="High Quality Seeds"
                            description="Sourced from certified organic farms and top-tier labs for maximum yield."
                        />
                        <FeatureCard
                            icon={<ShoppingBag className="h-10 w-10 text-primary" />}
                            title="Competitive Prices"
                            description="Direct-to-farmer pricing models without unnecessary middlemen."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                            title="Verified Suppliers"
                            description="Every supplier is vetted to ensure safety and reliability of inputs."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-green-50/50">
            <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                <div className="p-4 bg-white rounded-full shadow-sm">{icon}</div>
                <h3 className="text-xl font-semibold text-green-950">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
