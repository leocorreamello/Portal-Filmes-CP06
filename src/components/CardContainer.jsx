import { useRef, useState, useEffect } from 'react';

export default function CardContainer({ titulo, movies, className }) {
    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentMovies, setCurrentMovies] = useState([]);
    const itemsPerPage = 5;

    useEffect(() => {
        setCurrentMovies(movies.slice(0, itemsPerPage));
    }, [movies]);

    const scrollToIndex = (index) => {
        const scrollAmount = scrollContainerRef.current.clientWidth * index;
        scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        const newIndex = (currentIndex - 1 + Math.ceil(movies.length / itemsPerPage)) % Math.ceil(movies.length / itemsPerPage);
        setCurrentIndex(newIndex);
        setCurrentMovies(movies.slice(newIndex * itemsPerPage, (newIndex + 1) * itemsPerPage));
        scrollToIndex(newIndex);
    };

    const scrollRight = () => {
        const newIndex = (currentIndex + 1) % Math.ceil(movies.length / itemsPerPage);
        setCurrentIndex(newIndex);
        setCurrentMovies(movies.slice(newIndex * itemsPerPage, (newIndex + 1) * itemsPerPage));
        scrollToIndex(newIndex);
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <h1 className="text-3xl mb-4">{titulo}</h1>
            <div className="relative w-full">
                <button onClick={scrollLeft} className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">{"<"}</button>
                <div ref={scrollContainerRef} className="flex overflow-x-hidden gap-8 scrollbar-hide">
                    {currentMovies.map(movie => (
                        <div key={movie.id} className="flex-shrink-0">
                            {movie}
                        </div>
                    ))}
                </div>
                <button onClick={scrollRight} className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">{">"}</button>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    )
}