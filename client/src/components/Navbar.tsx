import { Check, Moon, Sun } from "lucide-react";

interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
    return (
        <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${isDark
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white/90 border-gray-200'
            }`}>
            <div className="max-w-8xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark
                            ? 'bg-linear-to-br from-purple-600 to-blue-600'
                            : 'bg-linear-to-br from-purple-500 to-blue-500'
                            }`}>
                            <Check className="w-6 h-6 text-white" />
                        </div>
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                            Task Management App
                        </h1>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-lg transition-all ${isDark
                            ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;