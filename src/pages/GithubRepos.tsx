import React, { useEffect, useState, useRef } from 'react';

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string;
}

const GithubRepos: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const totalPages = Math.ceil(repos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRepos = repos.slice(startIndex, endIndex);

    useEffect(() => {
        fetch('https://api.github.com/users/Perberto07/repos')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch repositories');
                return response.json();
            })
            .then((data) => {
                setRepos(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const goToPrevious = () => currentPage > 1 && goToPage(currentPage - 1);
    const goToNext = () => currentPage < totalPages && goToPage(currentPage + 1);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64 dark:bg-gray-900">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-gray-800 dark:border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Loading repositories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-6 max-w-4xl mx-auto mt-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-300">Error</h3>
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-8 dark:bg-gray-900 transition-colors duration-300">
            {/* Header */}
            <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..." />
                                </svg>
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                GitHub Repositories
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-md">
                            Explore my open source projects and contributions
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-full mt-4"></div>
                    </div>

                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{repos.length}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Repositories</div>
                    </div>
                </div>
            </div>

            {/* Page Info */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div>
                    Showing {startIndex + 1}-{Math.min(endIndex, repos.length)} of {repos.length} repositories
                </div>
                <div>
                    Page {currentPage} of {totalPages}
                </div>
            </div>

            {/* Repository List */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {currentRepos.map((repo) => (
                    <div
                        key={repo.id}
                        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between mb-3">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-words"
                                >
                                    {repo.name}
                                </a>
                                <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300 font-medium">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Public
                                </span>
                            </div>

                            {repo.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 break-words">
                                    {repo.description}
                                </p>
                            )}

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6v12h12v-6" />
                                </svg>
                                View Repo
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 gap-3">
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default GithubRepos;
