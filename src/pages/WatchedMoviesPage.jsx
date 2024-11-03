import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function WatchedMoviesPage() {
    const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('FilmesAssistidos')) || [];
        setWatchedMovies(storedMovies);
    }, []);

    return (
        <div className="p-4 mt-14 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Filmes Assistidos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {watchedMovies.map(movie => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    );
}
