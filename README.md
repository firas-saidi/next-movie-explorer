# 🎬 Next.js Movie Explorer

A modern, high-performance movie-browsing application built with Next.js 16, Tailwind CSS, and the TMDB API.

Live Demo: [https://next-movie-explorer.vercel.app](https://next-movie-explorer.vercel.app) (Replace with actual deployment link if different)
Repository: [https://github.com/firas-saidi/next-movie-explorer](https://github.com/firas-saidi/next-movie-explorer)

## ✨ Features

- **🚀 Trending & Top Rated**: Browse weekly trending movies and all-time top-rated classics.
- **♾️ Infinite Scroll**: Seamlessly load more movies as you scroll.
- **⚡ Lazy Loading**: Optimized performance with Suspense boundaries and Skeleton loaders.
- **🎨 Glassmorphism UI**: A visually stunning interface with modern blur effects and smooth animations.
- **📱 Fully Responsive**: Looks great on mobile, tablet, and desktop.
- **🔍 Search & Discovery**: Find movies by title with instant search capabilities.
- **❤️ Favorites**: Save your favorite movies to a persistent local list.
- **🌙 Dark Mode**: Built-in dark mode support (system preference aware).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Fetching**: Server Actions & [TMDB API](https://www.themoviedb.org/documentation/api)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/firas-saidi/next-movie-explorer.git
   cd next-movie-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your TMDB API Read Access Token:
   ```env
   TMDB_API_TOKEN=your_tmdb_read_access_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add your `TMDB_API_TOKEN` in the Vercel Environment Variables settings.
4. Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
