import React from 'react';
import type { ReactNode } from 'react';

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export function FormInput({ 
  label, 
  type, 
  placeholder, 
  icon, 
  rightIcon, 
  value,
  onChange 
}: FormInputProps) {
  return (
    <div>
      <label className="block text-red-500 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
          {icon}
        </div>
        <input
          type={type}
          className="w-full bg-black/50 text-white border border-red-500/30 rounded-lg py-2 px-10 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {rightIcon}
      </div>
    </div>
  );
}