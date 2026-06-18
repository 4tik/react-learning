type InputProps = React.ComponentProps<"input"> & {
    label?: string;
    error?: string;
};

export default function Input({
    label,
    error,
    className = "",
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">

            {label && (
                <label className="text-gray-600 font-semibold text-sm">
                    {label} <span className="text-red-500">*</span>
                </label>
            )}

            <input className={`input-basic ${className}`} {...props} />

            {error && (
                <small className="text-red-500">
                    {error}
                </small>
            )}
        </div>
    );
}