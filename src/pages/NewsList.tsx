import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";
import type { NewsArticle } from "../dtos/news.dto";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function NewsList() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNews()
            .then(data => setNews(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center mt-12 mb-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading latest news...</p>
                </div>
            </div>
        );
    }

    return (
       <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen transition-colors duration-500">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        📰 Latest News
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
    </div>

    {/* Swiper */}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-600',
        bulletClass: 'swiper-pagination-bullet bg-gray-300 dark:bg-gray-600',
      }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 3, spaceBetween: 32 },
      }}
      className="pb-12"
    >
      {news.map((article, index) => (
        <SwiperSlide key={index}>
          <div className="group bg-white dark:bg-gray-800 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            
            {/* Image */}
            {article.imageUrl && (
              <div className="relative overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 leading-tight">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
                >
                  {article.title}
                </a>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                {article.description?.slice(0, 140)}...
              </p>

              {/* Article Meta Info */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-1">
                  <span className="text-blue-500">📅</span>
                  <span className="font-medium">Published:</span>
                  <span>
                    {new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-500">✍️</span>
                    <span className="font-medium">By:</span>
                    <span className="truncate max-w-[100px]">{article.creator || "Anonymous"}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <span className="text-orange-500">📰</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[100px]">{article.sourceName}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.category.slice(0, 3).map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-100 dark:border-gray-600"
                    >
                      {cat}
                    </span>
                  ))}
                  {article.category.length > 3 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                      +{article.category.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                >
                  Read full article
                  <svg
                    className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>

    );
}