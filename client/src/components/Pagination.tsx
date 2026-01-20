import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    perPage: number;
    total: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    isDark?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    perPage,
    total,
    onPageChange,
    siblingCount = 1,
    isDark = false
}) => {
    const totalPages = Math.ceil(total / perPage);
    const startIndex = (currentPage - 1) * perPage;

    const startItem = startIndex + 1;
    const endItem = Math.min(startIndex + perPage, total);

    const getPageNumbers = (): (number | string)[] => {
        const totalNumbers = siblingCount * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages <= totalBlocks) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
        const showLeftEllipsis = leftSiblingIndex > 2;
        const showRightEllipsis = rightSiblingIndex < totalPages - 1;

        if (!showLeftEllipsis && showRightEllipsis) {
            const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
            return [...leftRange, 'ellipsis', totalPages];
        }

        if (showLeftEllipsis && !showRightEllipsis) {
            const rightRange = Array.from(
                { length: 3 + 2 * siblingCount },
                (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
            );
            return [1, 'ellipsis', ...rightRange];
        }

        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i
        );
        return [1, 'ellipsis-left', ...middleRange, 'ellipsis-right', totalPages];
    };

    const pageNumbers = getPageNumbers();

    const baseButtonClass = `h-10 min-w-10 flex items-center justify-center px-3 rounded-lg transition-all font-medium`;

    const getButtonClass = (isActive: boolean, isDisabled: boolean) => {
        if (isDisabled) {
            return `${baseButtonClass} opacity-50 cursor-not-allowed ${isDark ? 'text-gray-600' : 'text-gray-400'
                }`;
        }

        if (isActive) {
            return `${baseButtonClass} bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md`;
        }

        return `${baseButtonClass} ${isDark
            ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`;
    };

    return (
        <div className="w-full flex flex-col">
            <div className={`my-2 flex items-center justify-end ${isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                <p className="text-sm">
                    Showing <span className="font-semibold">{startItem}</span> to{' '}
                    <span className="font-semibold">{endItem}</span> of{' '}
                    <span className="font-semibold">{total}</span> tasks {' '}
                </p>
                <p className="ml-2 text-sm font-medium">
                    {' '}Page {currentPage} of {totalPages}
                </p>
            </div>
            <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={getButtonClass(false, currentPage === 1)}
                    aria-label="First page"
                >
                    <ChevronsLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={getButtonClass(false, currentPage === 1)}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {pageNumbers.map((pageNumber, index) => {
                    if (typeof pageNumber === 'string') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className={`h-10 min-w-10 flex items-center justify-center px-2 ${isDark ? 'text-gray-500' : 'text-gray-400'
                                    }`}
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </span>
                        );
                    }

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={getButtonClass(pageNumber === currentPage, false)}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={getButtonClass(false, currentPage === totalPages)}
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={getButtonClass(false, currentPage === totalPages)}
                    aria-label="Last page"
                >
                    <ChevronsRight className="w-5 h-5" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination