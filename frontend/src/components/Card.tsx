import React, { useState } from 'react';
import { Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CardItem = ({ title, description, date, category, status, onEdit, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    const statusColors = {
        completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const categoryColors = {
        work: 'bg-purple-500/10 text-purple-300',
        personal: 'bg-pink-500/10 text-pink-300',
        project: 'bg-cyan-500/10 text-cyan-300',
        other: 'bg-gray-500/10 text-gray-300'
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`}></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Top section - Category and Status */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors.other}`}>
                        <Tag className="w-3 h-3" />
                        {category}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status] || statusColors.pending}`}>
                        {status}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={onEdit}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-500/50 text-slate-300 hover:text-blue-400 rounded-lg transition-all duration-200 text-sm font-medium group/btn"
                    >
                        <Pencil className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
                        Edit
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/50 text-slate-300 hover:text-red-400 rounded-lg transition-all duration-200 text-sm font-medium group/btn"
                    >
                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Card() {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: 'Website Redesign Project',
            description: 'Complete overhaul of the company website with modern UI/UX principles and responsive design for all devices.',
            date: 'Jan 20, 2026',
            category: 'work',
            status: 'active'
        },
        {
            id: 2,
            title: 'Morning Meditation Practice',
            description: 'Daily 15-minute meditation routine to improve focus and mental clarity throughout the day.',
            date: 'Jan 15, 2026',
            category: 'personal',
            status: 'completed'
        },
        {
            id: 3,
            title: 'Mobile App Development',
            description: 'Building a cross-platform mobile application using React Native with advanced features and animations.',
            date: 'Jan 22, 2026',
            category: 'project',
            status: 'pending'
        },
        {
            id: 4,
            title: 'Quarterly Team Meeting',
            description: 'Review Q4 performance metrics and set objectives for the upcoming quarter with the entire team.',
            date: 'Jan 10, 2026',
            category: 'work',
            status: 'cancelled'
        }
    ]);

    const [notification, setNotification] = useState(null);

    const handleEdit = (id) => {
        setNotification({ type: 'edit', id });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleDelete = (id) => {
        setCards(cards.filter(card => card.id !== id));
        setNotification({ type: 'delete', id });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-8xl mx-auto">
                {/* Notification */}
                {notification && (
                    <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right">
                        <Alert className="bg-slate-800/90 backdrop-blur-xl border-slate-700 text-white">
                            <AlertDescription>
                                {notification.type === 'edit'
                                    ? `Editing card #${notification.id}...`
                                    : `Card #${notification.id} deleted successfully!`}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <CardItem
                            key={card.id}
                            {...card}
                            onEdit={() => handleEdit(card.id)}
                            onDelete={() => handleDelete(card.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}