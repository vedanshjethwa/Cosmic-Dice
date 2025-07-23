import { useState } from 'react';

interface WalletFormData {
  firstName: string;
  lastName: string;
  country: string;
  placeOfBirth: string;
  address: string;
  city: string;
  postalCode: string;
}

export function useWalletForm() {
  const [formData, setFormData] = useState<WalletFormData>({
    firstName: '',
    lastName: '',
    country: '',
    placeOfBirth: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (field: keyof WalletFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
}