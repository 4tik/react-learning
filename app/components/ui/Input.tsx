import React, { useId } from "react";
import { twMerge } from "tailwind-merge"; // Optional but highly recommended for Tailwind

type InputProps = React.ComponentProps<"input"> & {
    label?: string;
    error?: string;
};

export default function Input({
    label,
    error,
    className = "",
    id,
    required,
    ...props
}: InputProps) {
    // Generate a unique ID if one isn't provided to link label and input
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="text-gray-600 font-semibold text-sm cursor-pointer select-none"
                >
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                id={inputId}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                // Using twMerge ensures your base styles and custom classes merge beautifully
                className={twMerge(
                    "input-basic", 
                    error && "border-red-500 focus:ring-red-500", // Dynamic error styling
                    className
                )}
                {...props}
            />

            {error && (
                <p 
                    id={errorId} 
                    role="alert" 
                    className="text-red-500 text-xs mt-0.5"
                >
                    {error}
                </p>
            )}
        </div>
    );
}