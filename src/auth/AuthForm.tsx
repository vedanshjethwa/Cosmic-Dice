import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Calendar } from 'lucide-react';
import { FormInput } from './FormInput';
import { useAuthValidation } from '../hooks/useAuthValidation';

export function AuthForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { passwordError, validatePassword } = useAuthValidation();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError && (!isLogin && formData.password === formData.confirmPassword)) {
      onSubmit(e);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="text-primary h-5 w-5" />}
        onChange={(value) => handleChange('email', value)}
        value={formData.email}
      />

      {!isLogin && (
        <>
          <FormInput
            label="Username"
            type="text"
            placeholder="Choose a username"
            icon={<User className="text-primary h-5 w-5" />}
            onChange={(value) => handleChange('username', value)}
            value={formData.username}
          />

          <FormInput
            label="Date of Birth"
            type="date"
            placeholder=""
            icon={<Calendar className="text-primary h-5 w-5" />}
            onChange={(value) => handleChange('dateOfBirth', value)}
            value={formData.dateOfBirth}
          />
        </>
      )}

      <div className="space-y-4">
        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          icon={<Lock className="text-primary h-5 w-5" />}
          onChange={(value) => handleChange('password', value)}
          value={formData.password}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        {!isLogin && (
          <FormInput
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            icon={<Lock className="text-primary h-5 w-5" />}
            onChange={(value) => handleChange('confirmPassword', value)}
            value={formData.confirmPassword}
          />
        )}

        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg py-3 px-4 hover:from-primary-dark hover:to-primary transition-all duration-300 font-medium disabled:opacity-50"
        disabled={!!passwordError || (!isLogin && formData.password !== formData.confirmPassword)}
      >
        {isLogin ? 'Sign In' : 'Register'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-slate-600 hover:text-primary-dark transition-colors"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
        </button>
      </div>
    </form>
  );
}