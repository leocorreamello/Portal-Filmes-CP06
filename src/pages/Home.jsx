import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import './Home.css'; // Import the CSS file

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [seriesTV, setSeriesTV] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchMovies = async () => {
        try {
            //Juntando todos os fetches
            const [respostaPopulares, respostaSeriesTV, respostaUpcoming] = await Promise.all(
                [
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]
            );

            //Convertendo em JSON
            const popularData = await respostaPopulares.json();
            const seriesTVData = await respostaSeriesTV.json();
            const upcomingData = await respostaUpcoming.json();

            //Atualizar o estado
            setFilmesPopulares(popularData.results);
            setSeriesTV(seriesTVData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch { }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            <div className="carousel-wrapper mt-20"> {/* Add margin-top */}
                <div className="space-y-4">
                    <CardContainer titulo="Filmes Populares" movies={filmesPopulares.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))} className="flex flex-col items-center justify-center p-5 gap-8" />
                    <CardContainer titulo="Séries de TV" movies={seriesTV.map(serie => (
                        <MovieCard key={serie.id} {...serie} />
                    ))} className="flex flex-col items-center justify-center p-5 gap-8" />
                    <CardContainer titulo="Filmes que ainda vão lançar" movies={filmesUpcoming.map(filme => (
                        <MovieCard key={filme.id} {...filme} />
                    ))} className="flex flex-col items-center justify-center p-5 gap-8" />
                </div>
            </div>
        </>
    );
}
