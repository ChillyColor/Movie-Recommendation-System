# 🎬 Movie Recommendation System (MRS)

A modern, full-stack web application for discovering, browsing, and managing your favorite movies. Built with React and Express.js, this application provides a seamless movie discovery experience with real-time data from The Movie Database (TMDB) API.

## ✨ Features

### 🏠 **Home Page**
- **Popular Movies**: Browse trending and popular movies
- **Infinite Scroll**: Seamlessly load more movies as you scroll
- **Advanced Search**: Search for movies by title
- **Genre Filtering**: Filter movies by specific genres
- **Real-time Loading States**: Smooth loading animations and error handling

### 🎭 **Movie Details**
- **Comprehensive Information**: View detailed movie information including cast, plot, ratings
- **Movie Trailers**: Watch official movie trailers via YouTube integration
- **User Reviews**: Read and explore community reviews
- **Favorite Management**: Add or remove movies from your favorites list

### ❤️ **Favorites System**
- **Persistent Storage**: Favorites saved in localStorage for offline access
- **Quick Management**: Easy add/remove functionality from any movie card
- **Visual Indicators**: Clear visual feedback for favorite status

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Beautiful Animations**: Smooth transitions and hover effects
- **Intuitive Navigation**: Clean and user-friendly interface
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with modern CSS features
- **Infinite Scroll** - Smooth pagination experience

### Backend
- **Express.js** - Fast, unopinionated web framework
- **Node.js** - JavaScript runtime environment
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### External APIs
- **The Movie Database (TMDB)** - Comprehensive movie data and images

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/movie-review-system.git
cd movie-review-system
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=5000
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 5. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173
```

## 🌐 API Endpoints

The backend provides the following REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/popular` | GET | Get popular movies with pagination |
| `/api/search?q={query}` | GET | Search movies by title |
| `/api/movie/:id` | GET | Get detailed movie information |
| `/api/genres` | GET | Get list of movie genres |
| `/api/genre/:id` | GET | Get movies by genre with pagination |
| `/api/movie/:id/trailer` | GET | Get movie trailer URL |
| `/api/movie/:id/reviews` | GET | Get movie reviews |

### Example API Usage
```javascript
// Get popular movies
fetch('http://localhost:5000/api/popular')

// Search for movies
fetch('http://localhost:5000/api/search?q=avengers')

// Get movie details
fetch('http://localhost:5000/api/movie/550')
```

## 🏗️ Project Structure

```
movie-review-system/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── MovieCard.jsx
│   │   │   └── NavBar.jsx
│   │   ├── contexts/      # React Context for state management
│   │   │   └── MovieContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Movie.jsx
│   │   │   └── Favourites.jsx
│   │   ├── services/      # API service functions
│   │   │   └── api.js
│   │   ├── css/          # Styling files
│   │   └── App.jsx       # Main application component
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md
```

## 🎯 Key Components

### MovieContext
- Manages global favorites state
- Provides persistent localStorage integration
- Offers favorite management utilities

### MovieCard
- Displays movie poster, title, and rating
- Handles favorite toggle functionality
- Provides navigation to movie details

### Home Page
- Implements infinite scroll for seamless browsing
- Manages search and genre filtering
- Handles loading states and error management

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm start          # Start production server
npm run dev        # Start development server
```

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style
- ESLint configuration for consistent code quality
- Modern ES6+ JavaScript features
- React functional components with hooks
- Responsive CSS with modern styling

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure TMDB_API_KEY is configured
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Netlify, Vercel, or GitHub Pages
3. Update API URLs for production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing comprehensive movie data
- React team for the amazing framework
- Vite team for the fast build tool
- All contributors who help improve this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/movie-review-system/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

---

**Made with ❤️ by [Your Name]**

*Happy movie browsing! 🍿*

