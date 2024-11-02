import { useRef, useState } from 'react';

export default function CardContainer({ titulo, children, className }) {
    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = children.length;

    const scrollToIndex = (index) => {
        const scrollAmount = scrollContainerRef.current.clientWidth * index;
        scrollContainerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        const newIndex = (currentIndex - 1 + totalItems) % totalItems;
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
    };

    const scrollRight = () => {
        const newIndex = (currentIndex + 1) % totalItems;
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex);
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <h1 className="text-3xl mb-4">{titulo}</h1>
            <div className="relative w-full">
                <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2">{"<"}</button>
                <div ref={scrollContainerRef} className="flex overflow-x-hidden gap-8 scrollbar-hide">
                    {children}
                </div>
                <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2">{">"}</button>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalItems }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    )
}