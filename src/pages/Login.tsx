import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    BarChart3,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { loginUser } from "../auth/AuthService";
import { validateLogin } from "../lib/utils";
import { useToast } from '../context/ToastContext';

export default function Login() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [showPassword, setShowPassword] = useState(false);

    // ✅ STATE
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // ✅ INPUT CHANGE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ✅ SUBMIT
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateLogin(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);

        try {
            const data = await loginUser({
                UserName: form.username,
                PasswordHash: form.password
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("tokenExpiry", data.tokenExpiry);

                showToast("Login Successful! Welcome back.", "success", "Success!", "Continue");
                navigate("/dashboard");
            } else {
                const errorMsg = data.message || data.errorMessage || data.error || JSON.stringify(data);
                showToast(errorMsg, "error", "Error!", "Try Again");
            }

        } catch (err: any) {
            let errorMsg = "Login failed";
            if (err.response?.data) {
                // If it's a direct string from the server
                if (typeof err.response.data === 'string') {
                    errorMsg = err.response.data;
                } else {
                    // Try to extract common .NET exception/SP error formats
                    errorMsg =
                        err.response.data.message ||
                        err.response.data.ExceptionMessage ||
                        err.response.data.title ||
                        JSON.stringify(err.response.data);
                }
            } else if (err.message) {
                errorMsg = err.message;
            }
            showToast(errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-slate-50 dark:bg-slate-950 shadow-sm dark:shadow-none h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />

                    <h1 className="font-semibold text-lg tracking-tight text-blue-700 dark:text-blue-400">KING KONG GODRIVE</h1>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <span className="text-blue-800 dark:text-blue-300 font-bold uppercase tracking-widest text-sm">Enterprise</span>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-grow flex flex-col lg:flex-row items-center justify-center pt-16 pb-20 px-4 md:px-12 gap-12 max-w-7xl mx-auto w-full">
                {/* Hero Section */}
                <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
                    <div className="space-y-2 text-center lg:text-left">
                        <span className="text-[0.7rem] text-primary font-semibold tracking-[0.05em] uppercase">The Precision Concierge</span>
                        <h2 className="text-5xl lg:text-6xl text-on-surface font-bold leading-tight">Access Fleet Operations</h2>
                        <p className="text-on-surface-variant max-w-md mt-4">
                            Manage your global logistical footprint with authoritative precision. Securely monitor vehicle health, driver safety, and dispatch metrics in real-time.
                        </p>
                    </div>

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

                {/* Login Form */}
                <section className="w-full lg:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] space-y-8 border border-outline/5">
                        <div className="text-center lg:text-left">
                            <h3 className="text-on-surface text-xl font-bold">Sign In</h3>
                            <p className="text-sm text-on-surface-variant mt-1">Enter your credentials to manage your fleet</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="space-y-1.5">
                                <label className="block text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="text-outline group-focus-within:text-primary transition-colors" size={20} />
                                    </div>
                                    <input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all rounded-t-lg text-on-surface placeholder:text-outline/50 font-medium"
                                        placeholder="Enter your username"
                                        type="text"
                                    />
                                </div>
                                <p className="text-red-500 text-xs">{errors.username}</p>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Security Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-outline group-focus-within:text-primary transition-colors" size={20} />
                                    </div>
                                    <input
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full pl-11 pr-12 py-3 bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 transition-all rounded-t-lg text-on-surface placeholder:text-outline/50 font-medium"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <p className="text-red-500 text-xs">{errors.password}</p>
                            </div>

                            {/* Button */}
                            <button
                                className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                                type="submit"
                                disabled={loading}
                            >
                                <span>{loading ? "Signing in..." : "Sign In"}</span>
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
        </div>
    );
}