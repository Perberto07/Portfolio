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

    // Calculate pagination
    const totalPages = Math.ceil(repos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRepos = repos.slice(startIndex, endIndex);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch('https://api.github.com/users/Perberto07/repos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
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

    const goToPrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };  

    const goToNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading repositories...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-4xl mx-auto mt-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-800">Error</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Page Header */}
            <div className="mb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900">GitHub Repositories</h3>
                        </div>
                        <p className="text-gray-600 text-md">Explore my open source projects and contributions</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full mt-4"></div>
                    </div>

                    {/* Repository Count */}
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{repos.length}</div>
                        <div className="text-sm text-gray-500">Total Repositories</div>
                    </div>
                </div>
            </div>

            {/* Current Page Info */}
            <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, repos.length)} of {repos.length} repositories
                </div>
                <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </div>
            </div>

            {/* Repository List */}
            <div className="space-y-6 mb-8">
                {currentRepos.map((repo) => (
                    <div key={repo.id} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                {/* Repository Name */}
                                <div className="flex items-center gap-3 mb-3">
                                    <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors decoration-2 underline-offset-2 hover:underline"
                                     >
                                    {repo.name}
                                </a>
                                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600 font-medium">Public</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-6">
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-100 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Repo
                        </a>
                    </div>
            </div>
        </div>
    ))
}
      </div >

    {/* Pagination Controls */ }
{
    totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>
            </div>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                ? 'bg-gray-800 text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
    </div >
  );
};

export default GithubRepos;