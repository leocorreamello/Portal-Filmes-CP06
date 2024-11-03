import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]);

                const movieData = await movieResponse.json();
                const creditsData = await creditsResponse.json();
                const videosData = await videosResponse.json();

                setMovie(movieData);
                setCast(creditsData.cast);
                const officialTrailer = videosData.results.find(video => video.type === 'Trailer' && video.official);
                setTrailer(officialTrailer ? `https://www.youtube.com/watch?v=${officialTrailer.key}` : null);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const addToList = (listName) => {
        const currentList = JSON.parse(localStorage.getItem(listName)) || [];
        if (!currentList.some(item => item.id === movie.id)) {
            currentList.push(movie);
            localStorage.setItem(listName, JSON.stringify(currentList));
            alert(`Adicionado a ${listName}`);
        } else {
            alert(`Já está na lista ${listName}`);
        }
    };

    const removeFromList = (listName) => {
        const currentList = JSON.parse(localStorage.getItem(listName)) || [];
        const updatedList = currentList.filter(item => item.id !== movie.id);
        localStorage.setItem(listName, JSON.stringify(updatedList));
        alert(`Removido de ${listName}`);
    };

    return (
        <div className="p-4 mt-20 max-w-4xl mx-auto"> {/* Adjust mt-20 to add top margin */}
            {movie.title ? (
                <>
                    <h1 className="text-4xl font-bold mb-4 text-center">{movie.title}</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full md:w-1/3 rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col gap-4">
                            <p className="text-lg">{movie.overview}</p>
                            <p className="text-lg"><strong>Avaliação:</strong> {movie.vote_average}</p>
                            <p className="text-lg"><strong>Data de lançamento:</strong> {movie.release_date}</p>
                            <div className="flex gap-2">
                                <button onClick={() => addToList('FilmesAssistidos')} className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar a Filmes Assistidos</button>
                                <button onClick={() => addToList('FilmesParaVerDepois')} className="bg-green-500 text-white px-4 py-2 rounded">Adicionar a Filmes para Ver Depois</button>
                                <button onClick={() => removeFromList('FilmesAssistidos')} className="bg-red-500 text-white px-4 py-2 rounded">Remover de Filmes Assistidos</button>
                                <button onClick={() => removeFromList('FilmesParaVerDepois')} className="bg-red-500 text-white px-4 py-2 rounded">Remover de Filmes para Ver Depois</button>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Elenco</h2>
                    <ul className="list-disc list-inside mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cast.slice(0, 10).map(actor => (
                            <li key={actor.cast_id} className="flex items-center gap-2">
                                <img
                                    src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                                    alt={actor.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{actor.name} as {actor.character}</span>
                            </li>
                        ))}
                    </ul>
                    {trailer ? (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Trailer Oficial</h2>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={trailer}
                                    title="Trailer Oficial"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onError={() => setTrailer(null)}
                                    className="w-full h-full rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-red-500">Trailer indisponível.</p>
                    )}
                </>
            ) : (
                <p className="text-red-500 text-center">Detalhes não disponíveis no momento.</p>
            )}
        </div>
    );
}