import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path }) {
    return (
        <div className="relative movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                alt={title}
                className="w-full h-auto rounded-lg"
            />
            <div className="movie-info">
                <h2 className="text-lg font-bold">{title}</h2>
                <Link to={`/movies/${id}`} className="text-blue-400 hover:underline">Saber mais</Link>
            </div>
        </div>
    );
}