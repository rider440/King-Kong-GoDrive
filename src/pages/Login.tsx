import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Car,
    User,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    BarChart3,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, handle authentication here
        navigate('/');
    };

    return (
        <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-slate-50 dark:bg-slate-950 shadow-sm dark:shadow-none h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <Car className="text-blue-700 dark:text-blue-400" size={24} />
                    <h1 className="font-semibold text-lg tracking-tight text-blue-700 dark:text-blue-400">FleetCore</h1>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <span className="text-blue-800 dark:text-blue-300 font-bold uppercase tracking-widest text-sm">Enterprise</span>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-grow flex flex-col lg:flex-row items-center justify-center pt-16 pb-20 px-4 md:px-12 gap-12 max-w-7xl mx-auto w-full">
                {/* Hero Section: Narrative & Branding */}
                <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
                    <div className="space-y-2 text-center lg:text-left">
                        <span className="text-[0.7rem] text-primary font-semibold tracking-[0.05em] uppercase">The Precision Concierge</span>
                        <h2 className="text-5xl lg:text-6xl text-on-surface font-bold leading-tight">Access Fleet Operations</h2>
                        <p className="text-on-surface-variant max-w-md mt-4">
                            Manage your global logistical footprint with authoritative precision. Securely monitor vehicle health, driver safety, and dispatch metrics in real-time.
                        </p>
                    </div>

                    {/* Visual Accent (Bento-style snippet) */}
                    <div className="hidden lg:grid grid-cols-2 gap-4 w-full pt-8">
                        <div className="bg-surface-container-low p-6 rounded-xl space-y-3 border border-outline/5">
                            <BarChart3 className="text-primary" size={24} />
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">98.4%</div>
                                <div className="text-[0.7rem] uppercase tracking-wider font-semibold text-outline">Fleet Efficiency</div>
                            </div>
                        </div>
                        <div className="bg-primary text-on-primary p-6 rounded-xl space-y-3">
                            <ShieldCheck size={24} />
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">Secure</div>
                                <div className="text-[0.7rem] uppercase tracking-wider font-semibold opacity-80">2FA Protected</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Login Form Card */}
                <section className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] space-y-8 border border-outline/5">
                        <div className="text-center lg:text-left">
                            <h3 className="text-on-surface text-xl font-bold">Sign In</h3>
                            <p className="text-sm text-on-surface-variant mt-1">Enter your credentials to manage your fleet</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username Field */}
                            <div className="space-y-1.5">
                                <label className="block text-on-surface-variant uppercase tracking-wider text-[11px] font-bold" htmlFor="username">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="text-outline group-focus-within:text-primary transition-colors" size={20} />
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all rounded-t-lg text-on-surface placeholder:text-outline/50 font-medium"
                                        id="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="block text-on-surface-variant uppercase tracking-wider text-[11px] font-bold" htmlFor="password">Security Password</label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-outline group-focus-within:text-primary transition-colors" size={20} />
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-12 py-3 bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all rounded-t-lg text-on-surface placeholder:text-outline/50 font-medium"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                                    <span className="text-xs font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">Remember device</span>
                                </label>
                                <a className="text-xs font-semibold text-primary hover:text-primary-container transition-colors tracking-tight" href="#">Forgot Password?</a>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                                type="submit"
                            >
                                <span>Sign In</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="pt-4 text-center">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-outline-variant/30"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                                    <span className="bg-surface-container-lowest px-4 text-outline">Authorized Access Only</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 -z-10 w-[60%] h-full opacity-5 pointer-events-none overflow-hidden">
                <img
                    className="object-cover w-full h-full grayscale mix-blend-multiply"
                    alt="Modern high-end sedan headlights"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5vxWfrGI87kX1MSxfjZciLEEChd7cpEIut0Eon26sE9Uy6jWltGhctBZ3ALJAcJsEv0aBO4OALcKqC_ykosfxI8v4ZwDw69FM_i2_4BJHIcst9ITR94RJ3dSZUbhfcpC-cjhXGtbKfzXfGhLN04b-3Da6l87SIiwNWdEv89jL8AICytgd-8CPusppxXT0QzG5iPZLDHa7qCrRxaIqXW2k_CiN9kwegbJSSkEq8x07NBH8-DCf9t5q_mblZLo-QTe0Zao8kTuEfEE"
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center px-8 py-4 z-50">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 md:mb-0">
                    © 2024 FleetCore Enterprise. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <a className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer" href="#">Privacy Policy</a>
                    <a className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer" href="#">Terms of Service</a>
                    <a className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer" href="#">Contact Support</a>
                </div>
            </footer>
        </div>
    );
}
