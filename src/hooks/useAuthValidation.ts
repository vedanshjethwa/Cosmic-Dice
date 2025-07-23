import { useState } from 'react';

export function useAuthValidation() {
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(value)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(value)) {
      setPasswordError('Password must contain at least one number');
      return;
    }
    setPasswordError('');
  };

  return {
    passwordError,
    validatePassword
  };
}