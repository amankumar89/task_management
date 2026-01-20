import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import type { ToastType } from "@/types";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles: Record<ToastType, string> = {
        success: 'bg-emerald-500/90 border-emerald-400',
        error: 'bg-red-500/90 border-red-400',
        info: 'bg-blue-500/90 border-blue-400'
    };

    return (
        <div className={`fixed top-20 right-6 z-50 animate-in slide-in-from-right ${styles[type]} backdrop-blur-xl border text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-80">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;