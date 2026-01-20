import { Loader as Spinner } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-48">
            <Spinner className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
    );
}
