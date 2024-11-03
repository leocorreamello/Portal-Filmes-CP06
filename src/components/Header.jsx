import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="bg-slate-500 flex justify-between items-center h-14 px-4 fixed w-full z-50">
            <div className="flex items-center">
                <h1 className="font-bold text-lg text-white">Portal Filmes</h1>
                <button
                    className="ml-4 text-white md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    &#9776;
                </button>
            </div>
            <nav className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:gap-4`}>
                {user && (
                    <>
                        <NavLink to="/" className="text-sm text-white">Home</NavLink>
                        <NavLink to="/movies" className="text-sm text-white">Filmes</NavLink>
                        <NavLink to="/genre" className="text-sm text-white">Gêneros</NavLink>
                        <NavLink to="/contato" className="text-sm text-white">Contato</NavLink>
                        <NavLink to="/filmes-assistidos" className="text-sm text-white">Filmes assistidos</NavLink>
                        <NavLink to="/filmes-para-ver-depois" className="text-sm text-white">Filmes para ver depois</NavLink>
                    </>
                )}
            </nav>
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="bg-gray-700 px-4 py-2 rounded text-sm text-white"
                >
                    {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                </button>
                {user ? (
                    <>
                        <span className="text-sm text-white">Olá, {user.username}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-sm text-white">Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="bg-blue-500 px-4 py-2 rounded text-sm text-white">Login</NavLink>
                        <NavLink to="/register" className="bg-green-500 px-4 py-2 rounded text-sm text-white">Registrar</NavLink>
                    </>
                )}
            </div>
        </header>
    );
}