import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for conditional class names

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    isLoading = false, 
    className, 
    onClick,
    ...props 
}) => {
    const baseStyles = 'px-4 py-2 rounded text-white font-medium focus:outline-none';
    
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-gray-600 hover:bg-gray-700',
        danger: 'bg-red-600 hover:bg-red-700',
    };

    const loadingStyles = isLoading ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            className={cn(baseStyles, variants[variant], loadingStyles, className)}
            disabled={isLoading || props.disabled}
            onClick={onClick}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
