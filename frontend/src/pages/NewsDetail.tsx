import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Share2, Facebook, Twitter, Send, ArrowLeft, Tag } from 'lucide-react';
import { mockNews } from '../data/mockData';
import type { NewsArticle } from '../data/mockData';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (id) {
      const foundArticle = mockNews.find(news => news.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
        setViews(foundArticle.views);
        
        // Simulate view count increase
        setTimeout(() => {
          setViews(prev => prev + 1);
        }, 1000);

        // Get related news from same category
        const related = mockNews
          .filter(news => news.id !== id && news.category === foundArticle.category)
          .slice(0, 4);
        setRelatedNews(related);
      }
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatViews = (viewCount: number) => {
    if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K`;
    }
    return viewCount.toString();
  };

  const shareUrl = window.location.href;
  const shareTitle = article?.title || '';

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  if (!article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="bg-white  overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9 h-96">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                {article.category}
              </span>
              {article.trending && (
                <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                  Trending
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">By {article.author}</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(views)} views</span>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Share:</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('telegram')}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {article.content}
            </p>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="group flex space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                      {news.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>{news.author}</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatViews(news.views)}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}