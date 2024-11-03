import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function GenreListPage() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="p-4 mt-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Gêneros</h1>
            <div className="flex flex-wrap gap-4 justify-center">
                {genres.map(genre => (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setLoading(true)}
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
            {loading && <p className="text-center mt-4">Carregando filmes...</p>}
            <Outlet context={[setLoading]} />
        </div>
    );
}