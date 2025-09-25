import type { GetContentDto } from "../dtos/content.dto";
import { getContents } from "../services/contentService";
import { useService } from "../hooks/UseService";

function ContentListPage() {
    const { data: contents, loading, error } = useService<GetContentDto[]>(getContents);

    if (loading) return (
        <div className="flex items-center justify-center min-h-64">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading content...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-4xl mx-auto mt-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-red-800">Error Loading Content</h3>
                    <p className="text-red-600 text-sm">{error.message}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">


            {/* Content Sections */}
            {contents?.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No content sections found</h3>
                    <p className="text-gray-500">Create your first section to get started</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {contents?.map((content, idx) => (
                        <section key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                            {/* Section Header */}
                            <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                {content.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                    </div>
                                </div>
                            </div>

                            {/* Content Items */}
                            <div className="px-8 py-6">
                                {content.items?.length ? (
                                    <div className="space-y-4">
                                        <div className="grid gap-4">
                                            {content.items.map((item, tIdx) => (
                                                <div key={tIdx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors group/item">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                                                            {item.header}
                                                        </h4>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            {item.textContent}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No content items</h4>
                                        <p className="text-gray-500 mb-4">Add your first content item to this section</p>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            Add Content Item
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContentListPage;