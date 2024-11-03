import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <header className="bg-slate-500 flex text-white justify-around h-14 items-center fixed w-full">
            <div>
                <h1 className="font-bold">Portal Filmes</h1>
            </div>
            <nav>
                <ul className="flex gap-4">
                    {user && (
                        <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/movies">Filmes</NavLink></li>
                            <li><NavLink to="/genre">Gêneros</NavLink></li>
                            <li><NavLink to="/contato">Contato</NavLink></li>
                            <li><NavLink to="/filmes-assistidos">Filmes assistidos</NavLink></li>
                            <li><NavLink to="/filmes-para-ver-depois">Filmes para ver depois</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="flex gap-4">
                {user ? (
                    <>
                        <span>Olá, {user.username}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</NavLink>
                        <NavLink to="/register" className="bg-green-500 px-4 py-2 rounded">Registrar</NavLink>
                    </>
                )}
            </div>
        </header>
    );
}