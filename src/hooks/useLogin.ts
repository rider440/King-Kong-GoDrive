import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/context/ToastContext';
import { loginUser } from '@/services/authService';

interface LoginFormData {
  username: string;
  password: string;
}

interface UseLoginReturn {
  form: LoginFormData;
  errors: Record<string, string>;
  loading: boolean;
  showPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  togglePasswordVisibility: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState<LoginFormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (data: LoginFormData): Record<string, string> => {
    const err: Record<string, string> = {};
    if (!data.username) err.username = 'Username required';
    if (!data.password) err.password = 'Password required';
    return err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const data = await loginUser({
        UserName: form.username,
        PasswordHash: form.password
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpiry', data.tokenExpiry);
        showToast('Login Successful! Welcome back.', 'success', 'Success!', 'Continue');
        navigate('/dashboard');
      } else {
        const errorMsg = data.message || data.errorMessage || data.error || JSON.stringify(data);
        showToast(errorMsg, 'error', 'Error!', 'Try Again');
      }
    } catch (err: any) {
      let errorMsg = 'Login failed';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else {
          errorMsg =
            err.response.data.message ||
            err.response.data.ExceptionMessage ||
            err.response.data.title ||
            JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return {
    form,
    errors,
    loading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility
  };
};
