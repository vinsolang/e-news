import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Clock, Eye, Filter, Search } from 'lucide-react';
import { mockNews } from '../data/mockData';
import type { NewsArticle } from '../data/mockData';

export default function CategoryNews() {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryNames: { [key: string]: string } = {
    national: 'National News',
    international: 'International News',
    entertainment: 'Entertainment',
    sports: 'Sports',
    lifestyle: 'Life & Social',
    technology: 'Technology'
  };

  useEffect(() => {
    if (category) {
      const categoryNews = mockNews.filter(article => article.category === category);
      setNews(categoryNews);
    }
  }, [category]);

  useEffect(() => {
    let filtered = news.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort news based on selected option
    switch (sortBy) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.views - a.views);
        break;
      case 'oldest':
        filtered = filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'latest':
      default:
        filtered = filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
    }

    setFilteredNews(filtered);
  }, [news, sortBy, searchTerm]);

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

  if (!category) return null;

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryNames[category] || 'News'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay updated with the latest {categoryNames[category]?.toLowerCase() || 'news'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'oldest')}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchTerm ? 'No articles found matching your search.' : 'No articles available in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      {article.trending && (
                        <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                          Trending
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatViews(article.views)}</span>
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">By {article.author}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}