import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { FaSearch } from "react-icons/fa"

export default function MovieListPage() {
    const [search, setSearch] = useState("")
    const [filmes, setFilmes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`)
            .then(response => response.json())
            .then(data => setFilmes(data.results))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value)
        console.log(search)
    }

    const filmesFiltrados = filmes.filter(filme => filme.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <h2 className="mt-20 text-center text-3xl font-bold">Veja o catálogo completo de filmes</h2>
            <div className="relative w-full max-w-md mx-auto mt-4">
                <input
                    className="w-full p-3 pl-10 text-black rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar filmes..."
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <section className="flex flex-wrap justify-between gap-4 mt-4">
                {
                    isLoading ? <p className="text-center w-full">Carregando...</p> :
                        filmesFiltrados.length > 0 ?
                            filmesFiltrados.map(filme => (
                                <MovieCard key={filme.id} {...filme} />
                            )) :
                            <p className="text-center w-full">Filme não encontrado</p>
                }
            </section>
        </>
    )
}

