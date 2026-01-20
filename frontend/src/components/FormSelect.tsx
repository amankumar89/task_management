

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    isDark: boolean;
    options: SelectOption[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, error, isDark, options, ...props }) => {
    return (
        <div className="">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {label}
            </label>
            <select
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${error
                    ? 'border-red-500 focus:border-red-500'
                    : isDark
                        ? 'bg-slate-900 border-slate-600 text-white focus:border-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...props}
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default FormSelect