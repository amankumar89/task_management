
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    isDark: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, isDark, ...props }) => {
    return (
        <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {label}
            </label>
            <input
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${error
                    ? 'border-red-500 focus:border-red-500'
                    : isDark
                        ? 'bg-slate-900 border-slate-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;