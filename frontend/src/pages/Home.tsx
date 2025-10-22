import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, TrendingUp, ArrowRight, Play } from 'lucide-react';
import { mockNews, mockMovies } from '../data/mockData';
import type { NewsArticle } from '../data/mockData';

export default function Home() {
  const [featuredNews, setFeaturedNews] = useState<NewsArticle[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [topNews, setTopNews] = useState<NewsArticle[]>([]);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    setFeaturedNews(mockNews.filter(news => news.featured));
    setTrendingNews(mockNews.filter(news => news.trending));
    setTopNews(mockNews.sort((a, b) => b.views - a.views).slice(0, 4));
    setLatestNews(mockNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stay Informed with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">eNews</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and premium entertainment content from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/category/national"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Read Latest News</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/movies"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Movies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Breaking news and important updates from around the world</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((news, index) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`aspect-w-16 aspect-h-9 ${index === 0 ? 'h-96' : 'h-64'}`}>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                      {news.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{news.readTime} min read</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(news.views)}</span>
                    </span>
                  </div>
                  <h3 className={`font-bold mb-2 group-hover:text-blue-300 transition-colors ${
                    index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    {news.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">{news.excerpt}</p>
                  <div className="mt-4 flex items-center space-x-2 text-sm">
                    <span>By {news.author}</span>
                    <span>•</span>
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-red-500" />
                <span>Trending Now</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Most popular stories this week</p>
            </div>
            <Link
              to="/category/trending"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                      Trending
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(news.views)}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{news.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>By {news.author}</span>
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top News & Latest News Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Top News */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top News</h2>
              <div className="space-y-6">
                {topNews.map((news, index) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="group flex space-x-4 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                        {news.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{news.category}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatViews(news.views)}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="group bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-w-16 aspect-h-9 h-40">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full uppercase tracking-wide">
                          {news.category}
                        </span>
                        <span>{formatDate(news.publishedAt)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{news.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Preview */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Premium Movies 🎬</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Discover our exclusive collection of premium films</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMovies.filter(movie => movie.featured).map((movie) => (
              <div key={movie.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-w-2 aspect-h-3 h-80">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{movie.year}</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">${movie.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{movie.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{movie.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{movie.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              <span>Explore All Movies</span>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}