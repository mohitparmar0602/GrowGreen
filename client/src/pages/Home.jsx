import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
    ArrowRight, Sprout, ShoppingBag, ShieldCheck, Star, TrendingUp, Truck,
    Map, AlertTriangle, EyeOff, DollarSign, Handshake, Lock,
    Search, Languages, CloudSun, BarChart3, Smartphone, Users, Leaf
} from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { t } = useLanguage();
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/20 dark:via-background dark:to-emerald-950/20 overflow-hidden py-24 px-4 lg:py-32">
                <div className="container max-w-6xl flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
                            Bridging Farmers & Suppliers
                        </Badge>
                        <div className="md:hidden flex justify-center mb-4">
                            <WeatherWidget />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-green-950 dark:text-foreground leading-[1.1]">
                            Grow Green: <span className="text-green-600">{t('heroTitle')}</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-muted-foreground md:text-xl max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
                            {t('heroSubtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                            <Button size="lg" asChild className="text-lg h-12 px-8 bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-green-600/20 transition-all rounded-full">
                                <Link to="/marketplace">
                                    {t('startShopping')} <ShoppingBag className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            {!user && (
                                <Button size="lg" variant="outline" asChild className="text-lg h-12 px-8 rounded-full border-green-200 hover:bg-green-50 text-green-700">
                                    <Link to="/register">{t('joinPlatform')}</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 relative w-full max-w-lg md:max-w-none flex flex-col items-center">
                        <div className="hidden md:block absolute -top-12 -right-12 z-20">
                            <WeatherWidget />
                        </div>
                        <div className="relative z-10 bg-white dark:bg-card p-3 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
                            <img
                                src="/hero_modern_farming_uploaded.jpg"
                                alt="Modern Farming"
                                className="rounded-2xl w-full object-cover h-[450px]"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-200/40 to-emerald-200/40 blur-3xl rounded-full -z-10"></div>
                    </div>
                </div>
            </section >

            {/* Challenges Section */}
            < section className="py-24 bg-red-50/50 dark:bg-background" >
                <div className="container max-w-6xl px-4 mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-foreground mb-4">{t('challengesTitle')}</h2>
                        <p className="text-lg text-slate-600">Addressing the critical pain points in today's agricultural supply chain.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Map className="h-8 w-8 text-white" />}
                            title={t('limitedAccess')}
                            description="Difficulty finding high-quality seeds and fertilizers in remote areas."
                            color="bg-red-500"
                        />
                        <FeatureCard
                            icon={<DollarSign className="h-8 w-8 text-white" />}
                            title={t('priceDisparity')}
                            description="Heavy reliance on middlemen leads to inflated prices."
                            color="bg-orange-500"
                        />
                        <FeatureCard
                            icon={<AlertTriangle className="h-8 w-8 text-white" />}
                            title={t('qualityUncertainty')}
                            description="Risk of purchasing counterfeit or expired agricultural inputs."
                            color="bg-amber-500"
                        />
                        <FeatureCard
                            icon={<EyeOff className="h-8 w-8 text-white" />}
                            title={t('lackTransparency')}
                            description="No clear visibility on stock availability or fair market pricing."
                            color="bg-slate-600"
                        />
                    </div>
                </div>
            </section >

            {/* Solution & Impact Section */}
            < section className="py-24 bg-white dark:bg-card" >
                <div className="container max-w-6xl px-4 mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="bg-emerald-100 text-emerald-700 mb-4 hover:bg-emerald-200">Our Solution</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-foreground mb-4">Bridging the Gap & Transforming Agriculture</h2>
                        <p className="text-lg text-slate-600">Empowering farmers with direct access, fair pricing, and guaranteed quality.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <ImpactCard
                            icon={<Handshake className="h-10 w-10 text-green-600" />}
                            title="Direct Access"
                            desc="Connecting farmers directly with verified manufacturers and distributors."
                        />
                        <ImpactCard
                            icon={<TrendingUp className="h-10 w-10 text-green-600" />}
                            title="Fair Pricing"
                            desc="Competitive rates due to the removal of unnecessary intermediaries."
                        />
                        <ImpactCard
                            icon={<ShieldCheck className="h-10 w-10 text-green-600" />}
                            title="Quality Assurance"
                            desc="Only certified products listed on the platform."
                        />
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/10 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-center mb-8 text-green-900 dark:text-green-100">The Grow Green Impact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-white dark:bg-background p-6 rounded-xl shadow-sm">
                                <div className="text-4xl font-extrabold text-green-600 mb-2">Cost</div>
                                <div className="font-semibold text-slate-800 dark:text-foreground">Reduction</div>
                                <p className="text-sm text-slate-500 mt-2">Farmers save money by buying at competitive rates.</p>
                            </div>
                            <div className="bg-white dark:bg-background p-6 rounded-xl shadow-sm">
                                <div className="text-4xl font-extrabold text-green-600 mb-2">Yield</div>
                                <div className="font-semibold text-slate-800 dark:text-foreground">Increase</div>
                                <p className="text-sm text-slate-500 mt-2">Better quality seeds lead to higher crop production.</p>
                            </div>
                            <div className="bg-white dark:bg-background p-6 rounded-xl shadow-sm">
                                <div className="text-4xl font-extrabold text-green-600 mb-2">Time</div>
                                <div className="font-semibold text-slate-800 dark:text-foreground">Saving</div>
                                <p className="text-sm text-slate-500 mt-2">No need to travel long distances for supplies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Workflow Section */}
            < section className="py-24 bg-slate-50 dark:bg-background" >
                <div className="container max-w-5xl px-4 mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-foreground">Seamless Workflow</h2>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-green-200 -z-10 -translate-y-1/2 rounded-full"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <WorkflowStep number="1" title="Register" desc="Farmer registers & searches for products." />
                            <WorkflowStep number="2" title="Compare" desc="Compare prices & ratings from suppliers." />
                            <WorkflowStep number="3" title="Order" desc="Place order via Secure Payment or COD." />
                            <WorkflowStep number="4" title="Ship" desc="Supplier confirms & ships via logistics." />
                            <WorkflowStep number="5" title="Deliver" desc="Delivery to the farmer's doorstep." />
                        </div>
                    </div>
                </div>
            </section >

            {/* Features Detail Section */}
            < section className="py-24 bg-white dark:bg-card" >
                <div className="container max-w-6xl px-4 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-foreground mb-4">Empowering the Grower</h2>
                                <p className="text-lg text-slate-600">Advanced features designed for the modern farmer.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FeatureItem icon={<Search className="h-5 w-5" />} title="Smart Search" desc="Filter by crop type, season, or brand." />
                                <FeatureItem icon={<Languages className="h-5 w-5" />} title="Vernacular Support" desc="App available in local/regional languages." />
                                <FeatureItem icon={<Star className="h-5 w-5" />} title="Reviews & Ratings" desc="See community feedback on inputs." />
                                <FeatureItem icon={<CloudSun className="h-5 w-5" />} title="Weather Alerts" desc="Bonus: Suggestions based on weather." />
                            </div>
                        </div>

                        <div className="relative bg-emerald-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                            <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-950 font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
                                For Suppliers Too!
                            </div>
                            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-6 flex items-center gap-2">
                                <BarChart3 className="h-6 w-6" /> Expanding Market Reach
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-200 p-1.5 rounded-full"><Users className="h-4 w-4 text-green-800" /></div>
                                    <div><span className="font-bold text-slate-800 dark:text-foreground">Wide Distribution:</span> Reach farmers beyond local geography.</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-200 p-1.5 rounded-full"><Smartphone className="h-4 w-4 text-green-800" /></div>
                                    <div><span className="font-bold text-slate-800 dark:text-foreground">Inventory Management:</span> Real-time stock tracking.</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-200 p-1.5 rounded-full"><Lock className="h-4 w-4 text-green-800" /></div>
                                    <div><span className="font-bold text-slate-800 dark:text-foreground">Secure Payments:</span> Guaranteed payouts upon delivery.</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-24 bg-green-900 text-white relative overflow-hidden" >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Leaf className="h-64 w-64" />
                </div>
                <div className="container max-w-4xl px-4 text-center relative z-10 space-y-8 mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to boost your harvest?</h2>
                    <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Join today and experience the future of agricultural commerce.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="px-8 text-lg h-12 text-green-900 font-bold hover:bg-green-100" asChild>
                            <Link to="/register">Create Free Account</Link>
                        </Button>
                    </div>
                </div>
            </section >
        </div >
    );
}

function FeatureCard({ icon, title, description, color }) {
    return (
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-card h-full">
            <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                <div className={`p-4 rounded-2xl shadow-md ${color} transform group-hover:-translate-y-2 transition-transform duration-300`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-foreground mb-2">{title}</h3>
                    <p className="text-slate-600 dark:text-muted-foreground leading-relaxed text-sm">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function ImpactCard({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center p-6 border rounded-xl hover:bg-slate-50 transition-colors">
            <div className="mb-4 bg-green-50 p-3 rounded-full">{icon}</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-slate-600">{desc}</p>
        </div>
    )
}

function WorkflowStep({ number, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center relative bg-white dark:bg-card p-6 rounded-xl shadow-sm border md:border-none z-10">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl mb-4 border-4 border-white dark:border-background shadow-md">
                {number}
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
        </div>
    )
}

function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50/50 hover:bg-white transition-colors shadow-sm">
            <div className="mt-1 text-green-600">{icon}</div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-foreground">{title}</h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground mt-1">{desc}</p>
            </div>
        </div>
    )
}
