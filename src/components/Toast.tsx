import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <AnimatePresence>
            {toasts.map((toast) => (
                <div key={toast.id} className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => removeToast(toast.id)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Pop-up Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-sm w-full pt-12 pb-8 px-8 overflow-visible pointer-events-auto text-center"
                    >
                        {/* Overlapping Icon */}
                        <div className={cn(
                            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg transition-transform hover:scale-105",
                            toast.type === 'success' ? "bg-green-500" : "bg-red-500"
                        )}>
                            {toast.type === 'success' ? (
                                <CheckCircle className="text-white" size={40} strokeWidth={3} />
                            ) : (
                                <X className="text-white" size={40} strokeWidth={3} />
                            )}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Content */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {toast.title}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                                {toast.message}
                            </p>
                        </div>

                        {/* Button */}
                        <div className="mt-8">
                            <button
                                onClick={() => removeToast(toast.id)}
                                className={cn(
                                    "w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95",
                                    toast.type === 'success' ? "bg-green-600 hover:bg-green-700 shadow-green-500/20" : "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                                )}
                            >
                                {toast.buttonText || (toast.type === 'success' ? 'Continue Browsing' : 'Try Again')}
                            </button>
                        </div>

                        {/* Bottom Decoration */}
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0 h-2 rounded-b-[2rem]",
                            toast.type === 'success' ? "bg-green-600" : "bg-red-600"
                        )} />
                    </motion.div>
                </div>
            ))}
        </AnimatePresence>
    );
};
