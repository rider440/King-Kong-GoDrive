import React, { useState, useCallback } from 'react';

interface FormValues {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors;
  touched: Record<string, boolean>;
  setValues: (values: T) => void;
  setFieldValue: (field: string, value: any) => void;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetForm: () => void;
  setFormValues: (values: Partial<T>) => void;
}

export const useForm = <T extends FormValues>(
  initialValues: T,
  onValidate?: (values: T) => FormErrors
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFieldValue(name, val);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFieldTouched(e.target.name, true);
  }, []);

  const setFieldValue = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const setFieldError = (field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const setFieldTouched = (field: string, isTouched: boolean) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const setFormValues = (newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
  };

  return {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    resetForm,
    setFormValues
  };
};
