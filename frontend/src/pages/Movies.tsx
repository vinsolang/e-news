import React, { useState } from 'react';
import { Play, Star, Clock, DollarSign, Lock, Unlock } from 'lucide-react';
import { mockMovies } from '../data/mockData';
import type { Movie } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Movies() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handlePurchase = (movieId: string) => {
    // Simulate purchase logic
    alert('Payment integration would be implemented here with Stripe/PayPal');
  };

  const canWatchFull = (movie: Movie) => {
    return user?.premiumAccess || movie.price === 0;
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Movies 🎬
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our exclusive collection of premium films. Watch teasers for free or unlock the full experience with our premium content.
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative aspect-w-2 aspect-h-3 h-96">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-sm">Watch Teaser</p>
                  </div>
                </div>
                
                {movie.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {movie.duration}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{movie.year}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{movie.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {movie.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {movie.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {movie.genre.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${movie.price}
                    </span>
                  </div>
                  
                  {canWatchFull(movie) ? (
                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                      <Unlock className="w-4 h-4" />
                      <span className="text-sm font-medium">Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Premium</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Movie Modal */}
        {isModalOpen && selectedMovie && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div 
                  className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
                  onClick={() => setIsModalOpen(false)}
                ></div>
              </div>

              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Movie Poster */}
                    <div className="aspect-w-2 aspect-h-3 h-96 lg:h-auto">
                      <img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    {/* Movie Details */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {selectedMovie.title}
                          </h2>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                          >
                            ×
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{selectedMovie.year}</span>
                          <span>{selectedMovie.duration}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{selectedMovie.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedMovie.genre.map((genre) => (
                            <span
                              key={genre}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          {selectedMovie.description}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Teaser Button */}
                        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors">
                          <Play className="w-5 h-5" />
                          <span>Watch Free Teaser</span>
                        </button>
                        
                        {/* Full Movie Button */}
                        {canWatchFull(selectedMovie) ? (
                          <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                            <Unlock className="w-5 h-5" />
                            <span>Watch Full Movie</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePurchase(selectedMovie.id)}
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all"
                          >
                            <DollarSign className="w-5 h-5" />
                            <span>Buy Now - ${selectedMovie.price}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}