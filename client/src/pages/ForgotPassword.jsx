import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [resetLink, setResetLink] = useState(''); // Simulation only

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');
        setResetLink('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(res.data.message);
            if (res.data.resetLink) {
                setResetLink(res.data.resetLink);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-green-50/30 dark:bg-background">
            <Card className="w-full max-w-md border-green-100 dark:border-border shadow-xl bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-green-950 dark:text-foreground">
                        Forgot Password
                    </CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!message ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}
                            <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-4 rounded-md border border-green-100">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                {message}
                            </div>

                            {/* SIMULATION ONLY */}
                            {resetLink && (
                                <div className="p-4 bg-slate-100 rounded-md border text-sm break-all">
                                    <p className="font-bold text-slate-700 mb-2">[DEMO] Click to Reset:</p>
                                    <a href={resetLink} className="text-blue-600 hover:underline">
                                        {resetLink}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
                        <Link to="/login">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
