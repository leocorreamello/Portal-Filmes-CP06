import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import './Home.css'; // Import the CSS file

export default function Home() {

    const [filmesPopulares, setFilmesPopulares] = useState([])
    const [filmesTrending, setFilmesTrending] = useState([])
    const [filmesUpcoming, setFilmesUpcoming] = useState([])

    const fetchMovies = async () => {
        try {
            //Juntando todos os fetches
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all(
                [
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]
            )

            //Convertendo em JSON
            const popularData = await respostaPopulares.json()
            const trendingData = await respostaTrending.json()
            const upcomingData = await respostaUpcoming.json()

            //Atualizar o estado
            setFilmesPopulares(popularData.results)
            setFilmesTrending(trendingData.results)
            setFilmesUpcoming(upcomingData.results)

        }
        catch { }

    }
    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <>
            <div className="carousel-wrapper">
                <div className="space-y-4"> {/* Adicione esta div com spacing vertical */}
                    <CardContainer titulo="Populares" className="flex flex-col items-center justify-center p-5 gap-8">
                        {
                            filmesTrending
                                .slice(0, 5)
                                .map(filme => (
                                    <MovieCard key={filme.id} {...filme} style={{ width: '200px', height: '300px' }} />
                                ))
                        }
                    </CardContainer>
                    <CardContainer titulo="Series de TV" className="flex flex-col items-center justify-center p-5 gap-8">
                        {
                            filmesPopulares
                                .slice(0, 5)
                                .map(filme => (
                                    <MovieCard key={filme.id} {...filme} style={{ width: '200px', height: '300px' }} />
                                ))
                        }
                    </CardContainer>
                    <CardContainer titulo="Em breve" className="flex flex-col items-center justify-center p-5 gap-8">
                        {
                            filmesUpcoming
                                .slice(0, 5)
                                .map(filme => (
                                    <MovieCard key={filme.id} {...filme} style={{ width: '200px', height: '300px' }} />
                                ))
                        }
                    </CardContainer>
                </div>
            </div>
        </>
    )
}
