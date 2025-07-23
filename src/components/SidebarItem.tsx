import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  Icon: LucideIcon;
  onClick?: () => void;
  label?: string;
  image?: string;
  className?: string;
}

export function SidebarItem({ Icon, onClick, label, image, className }: SidebarItemProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 p-2 ${className || ''}`}
      >
        <Icon size={24} />
        {image && (
          <div className="absolute -right-2 -top-2 w-4 h-4">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-full ring-2 ring-blue-500/50"
            />
          </div>
        )}
      </button>
      {label && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[#0A1929] rounded-md text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
}