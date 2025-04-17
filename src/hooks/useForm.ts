//myproject
import { useState, ChangeEvent, FormEvent } from 'react';

// الأنواع الأساسية
export type FieldValues = Record<string, any>;
export type FieldErrors<T> = Partial<Record<keyof T, string>>;
export type FieldName<T> = keyof T;

// قواعد التحقق
export interface ValidationRules {
  required?: string | boolean;
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any) => string | boolean;
}

// حالة النموذج
export interface FormState<T> {
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  touchedFields: Partial<Record<keyof T, boolean>>;
}

// نتيجة التسجيل
export interface RegisterOptions {
  required?: string | boolean;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | boolean;
}

export interface UseFormReturn<T extends FieldValues = FieldValues> {
  register: (name: FieldName<T>, options?: RegisterOptions) => {
    name: string;
    onChange: (e: ChangeEvent<any>) => void;
    onBlur: () => void;
    ref: (instance: any) => void;
    value: any;
  };
  handleSubmit: (onSubmit: (data: T) => void | Promise<void>) => (e: FormEvent) => void;
  reset: (values?: Partial<T>) => void;
  setValue: (name: FieldName<T>, value: any, shouldValidate?: boolean) => void;
  getValues: (name?: FieldName<T>) => any;
  formState: FormState<T>;
  watch: (name?: FieldName<T>) => any;
  errors: FieldErrors<T>;
}

export function useForm<T extends FieldValues>(
  defaultValues: T = {} as T
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [fields, setFields] = useState<Record<string, any>>({});

  const validateField = (
    name: FieldName<T>,
    value: any,
    rules?: RegisterOptions
  ): string | null => {
    if (!rules) return null;

    // تحقق من الحقل المطلوب
    if (rules.required) {
      const isEmpty = value === undefined || value === null || value === '';
      if (isEmpty) {
        return typeof rules.required === 'string'
          ? rules.required
          : `${String(name)} مطلوب`;
      }
    }

    // تحقق من الحد الأدنى
    if (rules.min && typeof value === 'number') {
      const min = typeof rules.min === 'number' ? rules.min : rules.min.value;
      const message = typeof rules.min === 'number'
        ? `${String(name)} يجب أن يكون أكبر من أو يساوي ${min}`
        : rules.min.message;
      
      if (value < min) return message;
    }

    // تحقق من الحد الأقصى
    if (rules.max && typeof value === 'number') {
      const max = typeof rules.max === 'number' ? rules.max : rules.max.value;
      const message = typeof rules.max === 'number'
        ? `${String(name)} يجب أن يكون أصغر من أو يساوي ${max}`
        : rules.max.message;
      
      if (value > max) return message;
    }

    // تحقق من الحد الأدنى للطول
    if (rules.minLength && typeof value === 'string') {
      const minLength = typeof rules.minLength === 'number' ? rules.minLength : rules.minLength.value;
      const message = typeof rules.minLength === 'number'
        ? `${String(name)} يجب أن يكون ${minLength} أحرف على الأقل`
        : rules.minLength.message;
      
      if (value.length < minLength) return message;
    }

    // تحقق من الحد الأقصى للطول
    if (rules.maxLength && typeof value === 'string') {
      const maxLength = typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength.value;
      const message = typeof rules.maxLength === 'number'
        ? `${String(name)} يجب أن يكون ${maxLength} أحرف على الأكثر`
        : rules.maxLength.message;
      
      if (value.length > maxLength) return message;
    }

    // تحقق من نمط
    if (rules.pattern) {
      const pattern = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value;
      const message = rules.pattern instanceof RegExp 
        ? `${String(name)} غير صالح`
        : rules.pattern.message;
      
      if (!pattern.test(String(value))) return message;
    }

    // تحقق مخصص
    if (rules.validate) {
      const result = rules.validate(value);
      if (typeof result === 'string') return result;
      if (result === false) return `${String(name)} غير صالح`;
    }

    return null;
  };

  const register = (name: FieldName<T>, options: RegisterOptions = {}) => {
    // تسجيل الحقل
    fields[name as string] = { options };

    return {
      name: name as string,
      onChange: (e: ChangeEvent<any>) => {
        const target = e.target;
        const newValue = target.type === 'checkbox' ? target.checked : target.value;
        
        setValue(name, newValue, true);
      },
      onBlur: () => {
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
        
        const options = fields[name as string]?.options;
        if (options) {
          const error = validateField(name, values[name], options);
          if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
          } else {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name as string];
              return newErrors;
            });
          }
        }
      },
      ref: (instance: any) => {
        // لا شيء هنا، ولكن ضروري للتوافق مع react-hook-form
      },
      value: values[name] !== undefined ? values[name] : ''
    };
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors<T> = {};
    let isValid = true;

    // تحقق من صحة جميع الحقول المسجلة
    Object.entries(fields).forEach(([key, field]) => {
      const name = key as keyof T;
      const error = validateField(name, values[name], field.options);
      
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (onSubmit: (data: T) => void | Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();
      
      // وضع كل الحقول على أنها تم لمسها
      const allTouched = Object.keys(fields).reduce((acc, key) => {
        return { ...acc, [key]: true };
      }, {});
      
      setTouchedFields(allTouched as Partial<Record<keyof T, boolean>>);
      setIsSubmitting(true);
      
      const isValid = validateForm();
      if (isValid) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      }
      
      setIsSubmitting(false);
    };
  };

  const reset = (newValues: Partial<T> = {}) => {
    const resetValues = { ...defaultValues, ...newValues };
    setValues(resetValues as T);
    setErrors({});
    setTouchedFields({});
    setIsDirty(false);
  };

  const setValue = (name: FieldName<T>, value: any, shouldValidate = false) => {
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      return newValues;
    });
    
    setIsDirty(true);
    
    if (shouldValidate) {
      const options = fields[name as string]?.options;
      if (options) {
        const error = validateField(name, value, options);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name as string];
            return newErrors;
          });
        }
      }
    }
  };

  const getValues = (name?: FieldName<T>) => {
    return name ? values[name] : values;
  };

  const watch = (name?: FieldName<T>) => {
    return name ? values[name] : values;
  };

  const formState: FormState<T> = {
    errors,
    isSubmitting,
    isDirty,
    isValid: Object.keys(errors).length === 0,
    touchedFields
  };

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState,
    watch,
    errors
  };
}