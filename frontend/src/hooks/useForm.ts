import { useEffect, useState } from 'react';
import { Schema, ZodError, ZodIssue } from 'zod';

type FormValues = Record<string, string>;

type ValidationResult = {
  inputErrors: Record<string, string | null>;
  isFormValid: boolean;
};

export const useForm = <T = FormValues>(initialValue: T, schema: Schema<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValue);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    inputErrors: {},
    isFormValid: false,
  });

  const validateForm = (values: T) => {
    try {
      schema.parse(values);
      setValidationResult({ inputErrors: {}, isFormValid: true });
    } catch (error) {
      if (error instanceof ZodError) {
        const allIssues: ZodIssue[] = error.issues;
        const errors: Record<string, string | null> = {};

        allIssues.forEach((issue) => {
          if (issue.path) {
            errors[issue.path.join('.')] = issue.message;
          }
        });

        setValidationResult({ inputErrors: errors, isFormValid: false });
      }
    }
  };

  useEffect(() => {
    validateForm(formValues);
  }, [formValues, schema]);

  const onInputChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onResetForm = () => {
    setFormValues(initialValue);
  };

  return {
    ...formValues,
    formValues,
    onInputChange,
    onResetForm,
    validationResult,
    ...validationResult,
  };
};
