import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function MoviesByGenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [setLoading] = useOutletContext();

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}&language=pt-br`);
                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [id, setLoading]);

    return (
        <div className="p-4 mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map(movie => (
                <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                    <MovieCard {...movie} />
                </div>
            ))}
        </div>
    );
}