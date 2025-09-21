import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'

interface Movie {
  id: number
  title: string
  rating: number
  year: number
  genre: string
  image: string
  type: 'movie' | 'series' | 'anime' | 'drama'
  isFavorite: boolean
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Quantum Strike",
    rating: 4.5,
    year: 2024,
    genre: "Боевик",
    image: "/img/349c98be-9f6c-4c78-97cc-bf9a02b158a0.jpg",
    type: "movie",
    isFavorite: false
  },
  {
    id: 2,
    title: "Spirit Journey",
    rating: 4.8,
    year: 2024,
    genre: "Аниме",
    image: "/img/6564925b-5e89-496c-a7bd-9e95f1e1a064.jpg",
    type: "anime",
    isFavorite: true
  },
  {
    id: 3,
    title: "Love in Seoul",
    rating: 4.2,
    year: 2024,
    genre: "Дорама",
    image: "/img/38e2e5c2-35ee-45e5-8dea-9d845c1c7102.jpg",
    type: "drama",
    isFavorite: false
  },
  {
    id: 4,
    title: "Mystery Forest",
    rating: 4.6,
    year: 2024,
    genre: "Сериал",
    image: "/img/349c98be-9f6c-4c78-97cc-bf9a02b158a0.jpg",
    type: "series",
    isFavorite: false
  },
  {
    id: 5,
    title: "Dragon's Tale",
    rating: 4.9,
    year: 2024,
    genre: "Аниме",
    image: "/img/6564925b-5e89-496c-a7bd-9e95f1e1a064.jpg",
    type: "anime",
    isFavorite: true
  },
  {
    id: 6,
    title: "Winter Romance",
    rating: 4.3,
    year: 2024,
    genre: "Дорама",
    image: "/img/38e2e5c2-35ee-45e5-8dea-9d845c1c7102.jpg",
    type: "drama",
    isFavorite: false
  }
]

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'movies' | 'anime' | 'series' | 'search' | 'favorites'>('home')
  const [movies, setMovies] = useState<Movie[]>(mockMovies)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === 'home') return matchesSearch
    if (activeTab === 'movies') return movie.type === 'movie' && matchesSearch
    if (activeTab === 'anime') return movie.type === 'anime' && matchesSearch
    if (activeTab === 'series') return movie.type === 'series' && matchesSearch
    if (activeTab === 'favorites') return movie.isFavorite && matchesSearch
    if (activeTab === 'search') return matchesSearch
    
    return matchesSearch
  })

  const toggleFavorite = (id: number) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
    ))
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(rating)

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Icon key={`full-${i}`} name="Star" size={16} className="fill-golden text-golden" />
        ))}
        {hasHalfStar && (
          <Icon name="Star" size={16} className="fill-golden/50 text-golden" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">{rating}/5</span>
      </div>
    )
  }

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Card className="group relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            movie.isFavorite 
              ? 'bg-red-500/20 hover:bg-red-500/30' 
              : 'bg-white/20 hover:bg-white/30'
          }`}
          onClick={() => toggleFavorite(movie.id)}
        >
          <Icon 
            name="Heart" 
            size={18} 
            className={movie.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'} 
          />
        </Button>

        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg"
            size="sm"
          >
            <Icon name="Play" size={16} className="mr-2 fill-white" />
            Смотреть
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-charcoal-900 text-lg leading-tight mb-2 line-clamp-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
            {movie.genre}
          </span>
          <span className="text-sm text-gray-500">{movie.year}</span>
        </div>
        
        {renderStars(movie.rating)}
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Film" size={32} className="text-indigo-600" />
              <h1 className="text-2xl font-bold text-charcoal-900">CineStream</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'movies', label: 'Фильмы', icon: 'Film' },
                { id: 'anime', label: 'Аниме', icon: 'Zap' },
                { id: 'series', label: 'Сериалы', icon: 'Tv' },
                { id: 'search', label: 'Поиск', icon: 'Search' },
                { id: 'favorites', label: 'Избранное', icon: 'Heart' }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  onClick={() => setActiveTab(item.id as any)}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Icon name="Menu" size={24} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      {(activeTab === 'search' || searchQuery) && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative max-w-md mx-auto">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск фильмов, сериалов, аниме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      {activeTab === 'home' && !searchQuery && (
        <section className="relative bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center animate-fade-in">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Откройте мир <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  кинематографа
                </span>
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Фильмы, сериалы, аниме и дорамы в одном месте. 
                Наслаждайтесь качественным контентом с удобной системой рейтингов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-lg"
                  onClick={() => setActiveTab('movies')}
                >
                  <Icon name="Play" size={20} className="mr-2 fill-indigo-700" />
                  Начать просмотр
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-indigo-700 font-semibold px-8 py-3 rounded-lg"
                  onClick={() => setActiveTab('favorites')}
                >
                  <Icon name="Heart" size={20} className="mr-2" />
                  Мое избранное
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-charcoal-900">
            {activeTab === 'home' && 'Популярное сейчас'}
            {activeTab === 'movies' && 'Фильмы'}
            {activeTab === 'anime' && 'Аниме'}
            {activeTab === 'series' && 'Сериалы'}
            {activeTab === 'search' && 'Результаты поиска'}
            {activeTab === 'favorites' && 'Избранное'}
          </h2>
          
          <div className="text-sm text-gray-500">
            Найдено: {filteredMovies.length} {
              filteredMovies.length === 1 ? 'результат' : 
              filteredMovies.length < 5 ? 'результата' : 'результатов'
            }
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить поисковый запрос или выберите другую категорию</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Film" size={28} className="text-indigo-400" />
                <h3 className="text-xl font-bold">CineStream</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Ваш личный кинотеатр с лучшими фильмами, сериалами, аниме и дорамами. 
                Смотрите качественный контент в удобном формате.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Фильмы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Сериалы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аниме</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Дорамы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CineStream. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index