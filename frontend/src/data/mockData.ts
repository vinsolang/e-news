export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  views: number;
  featured: boolean;
  trending: boolean;
  readTime: number;
  tags: string[];
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  fullMovie?: string;
  duration: string;
  genre: string[];
  year: number;
  rating: number;
  price: number;
  featured: boolean;
}

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Breaking: Major Economic Summit Concludes with Historic Agreement',
    excerpt: 'World leaders reach unprecedented consensus on global trade policies in landmark summit.',
    content: 'In a historic move that will reshape international commerce, leaders from over 50 nations have reached a comprehensive agreement on global trade policies. The three-day summit, held in Geneva, addressed critical issues including digital commerce regulations, environmental standards, and fair labor practices across international borders. The agreement is expected to boost global GDP by an estimated 2.5% over the next five years while establishing new frameworks for sustainable development. Key provisions include streamlined customs procedures, enhanced intellectual property protections, and coordinated responses to supply chain disruptions.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    category: 'international',
    author: 'Sarah Johnson',
    publishedAt: '2025-01-15T08:30:00Z',
    views: 15420,
    featured: true,
    trending: true,
    readTime: 4,
    tags: ['politics', 'economy', 'international']
  },
  {
    id: '2',
    title: 'Revolutionary AI Technology Transforms Healthcare Diagnostics',
    excerpt: 'New machine learning algorithm shows 95% accuracy in early disease detection.',
    content: 'A groundbreaking artificial intelligence system developed by researchers at leading medical institutions has achieved a remarkable 95% accuracy rate in detecting early-stage diseases from routine blood tests. The AI model, trained on over 1 million patient records, can identify biomarkers for conditions including cancer, diabetes, and cardiovascular disease months before traditional diagnostic methods. Clinical trials across 12 hospitals have shown the system reduces diagnostic time by 70% while significantly improving patient outcomes through early intervention.',
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg',
    category: 'technology',
    author: 'Dr. Michael Chen',
    publishedAt: '2025-01-15T06:15:00Z',
    views: 12850,
    featured: true,
    trending: true,
    readTime: 6,
    tags: ['healthcare', 'AI', 'innovation']
  },
  {
    id: '3',
    title: 'Championship Finals Set After Thrilling Semi-Final Matches',
    excerpt: 'Two powerhouse teams advance to the championship after nail-biting victories.',
    content: 'In what many are calling the most exciting semi-finals in tournament history, the championship matchup is now set after two spectacular games that went into overtime. Team Alpha secured their spot with a stunning 28-24 victory, while Team Beta dominated the second semi-final 35-21. Both teams showed incredible determination and skill, setting up what promises to be an unforgettable championship game next Sunday.',
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
    category: 'sports',
    author: 'Tom Wilson',
    publishedAt: '2025-01-14T22:45:00Z',
    views: 8920,
    featured: false,
    trending: true,
    readTime: 3,
    tags: ['championship', 'finals', 'competition']
  },
  {
    id: '4',
    title: 'Sustainable Living Movement Gains Momentum in Urban Areas',
    excerpt: 'Cities worldwide embrace eco-friendly initiatives as climate awareness grows.',
    content: 'Urban communities across the globe are embracing sustainable living practices at an unprecedented rate. From rooftop gardens to zero-waste initiatives, city dwellers are finding innovative ways to reduce their environmental impact. Recent studies show a 40% increase in sustainable practices adoption over the past year, with millennials and Gen Z leading the charge.',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
    category: 'lifestyle',
    author: 'Emma Green',
    publishedAt: '2025-01-14T14:20:00Z',
    views: 6750,
    featured: false,
    trending: false,
    readTime: 5,
    tags: ['sustainability', 'environment', 'urban']
  },
  {
    id: '5',
    title: 'Hollywood Buzzes with Excitement Over Upcoming Film Festival',
    excerpt: 'Industry insiders predict record-breaking attendance at this years premier event.',
    content: 'The entertainment industry is abuzz with anticipation as preparations for the annual film festival reach their final stages. This years event promises to showcase groundbreaking cinema from both established directors and emerging talent. With over 200 films selected from thousands of submissions worldwide, attendees can expect a diverse range of storytelling that pushes creative boundaries.',
    image: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg',
    category: 'entertainment',
    author: 'Jake Morrison',
    publishedAt: '2025-01-14T11:30:00Z',
    views: 5240,
    featured: false,
    trending: false,
    readTime: 4,
    tags: ['film', 'festival', 'cinema']
  },
  {
    id: '6',
    title: 'National Infrastructure Investment Plan Unveiled',
    excerpt: 'Government announces $2 trillion initiative to modernize transportation and utilities.',
    content: 'In a comprehensive address to the nation, government officials unveiled an ambitious $2 trillion infrastructure modernization plan spanning the next decade. The initiative focuses on upgrading transportation networks, expanding renewable energy infrastructure, and improving digital connectivity in rural areas. The plan is expected to create over 1 million jobs while positioning the country as a leader in sustainable infrastructure development.',
    image: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg',
    category: 'national',
    author: 'Rachel Martinez',
    publishedAt: '2025-01-13T16:45:00Z',
    views: 11200,
    featured: true,
    trending: false,
    readTime: 7,
    tags: ['infrastructure', 'government', 'investment']
  }
];

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Quantum Horizons',
    description: 'A thrilling sci-fi adventure that explores the boundaries of space and time.',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    trailer: 'https://example.com/trailer1',
    fullMovie: 'https://example.com/movie1',
    duration: '2h 18m',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    year: 2024,
    rating: 8.7,
    price: 4.99,
    featured: true
  },
  {
    id: '2',
    title: 'The Last Symphony',
    description: 'A powerful drama about music, loss, and the healing power of art.',
    poster: 'https://images.pexels.com/photos/7991440/pexels-photo-7991440.jpeg',
    trailer: 'https://example.com/trailer2',
    duration: '1h 52m',
    genre: ['Drama', 'Music'],
    year: 2024,
    rating: 9.1,
    price: 3.99,
    featured: true
  },
  {
    id: '3',
    title: 'Digital Uprising',
    description: 'A cyber-thriller that questions the nature of reality in our connected world.',
    poster: 'https://images.pexels.com/photos/7991669/pexels-photo-7991669.jpeg',
    trailer: 'https://example.com/trailer3',
    duration: '2h 5m',
    genre: ['Thriller', 'Sci-Fi'],
    year: 2024,
    rating: 8.3,
    price: 4.99,
    featured: false
  }
];