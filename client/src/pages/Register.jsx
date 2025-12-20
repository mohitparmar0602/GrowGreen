import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Leaf, Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'farmer'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setError('');

        if (!formData.email.includes('@')) {
            setError('Email must contain @');
            setIsLoading(false);
            return;
        }

        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
        // Or if "alphanumeric" just means "only letters and numbers allowed", use: /^[a-zA-Z0-9]+$/
        // User asked for "alphanumeric", usually implies "letters and numbers".
        // Let's stick to the plan: "at least one letter and one number" is often what people mean by "alphanumeric requirements" but strictly "alphanumeric" often means "only [a-z0-9]".
        // However, a password usually requires complexity. "alphanumeric" as a constraint often means "must contain letters and numbers".
        // Let's assume the user meant "must contain at least one letter and at least one number" as per plan. 
        // Wait, "alphanumeric" literally means "consisting of or using both letters and numerals".
        // Let's implement robust check: must contain letter, must contain number.
        // And for the "only alphanumeric" interpretation?
        // "password to be alphanumeric" -> stronger constraint probably means "ONLY alphanumeric" (no special chars)?
        // OR "must have alpha AND numeric"?
        // Given common patterns, I'll go with "must contain letters and numbers" to be safe on complexity, but simply checking regex /^[a-zA-Z0-9]+$/ might be what they literally asked (no special chars).
        // Let's support special chars but REQUIRE alpha and numeric?
        // Actually, user said "password to be alphanumeric". This often means "Only letters and numbers".
        // Let's verify with a more standard approach if vague: usually people want specific complexity.
        // But "alphanumeric" usually implies the character set.
        // I will implement: Must contain at least one letter AND at least one number.
        
        const hasLetter = /[a-zA-Z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);

        if (!hasLetter || !hasNumber) {
            setError('Password must be alphanumeric (contain both letters and numbers)');
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error("Full Registration Error:", err);
            const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-green-50/30">
                <Card className="w-full max-w-md border-green-100 shadow-xl bg-white/80 backdrop-blur-sm text-center p-8">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-950 mb-2">Registration Successful!</h2>
                    <p className="text-muted-foreground mb-4">
                        Welcome to Grow Green, {formData.username}! A confirmation email has been sent.
                    </p>
                    <p className="text-sm text-green-700">Redirecting to login...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-green-50/30">
            <Card className="w-full max-w-md border-green-100 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Leaf className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-green-950">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Join our community of verified farmers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium leading-none">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="FarmerJohn"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
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
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                                    value={formData.password}
                                    onChange={handleChange}
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
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Creating account...
                                </div>
                            ) : (
                                <>Sign Up <ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    <div>
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
