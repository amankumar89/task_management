import { Loader as Loader2 } from "lucide-react";

const Loader = ({ show = true, text = "Loading..." }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
                <p className="text-sm text-white">{text}</p>
            </div>
        </div>
    );
};

export default Loader;
