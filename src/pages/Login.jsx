import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if user exists and password matches
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('user', JSON.stringify({ username: user.username }));
            navigate('/');
        } else {
            setError('Nome de usuário ou senha incorretos');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <form onSubmit={handleLogin} className="bg-gray-700 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Nome de Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded bg-gray-600 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-600 text-white"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 p-2 rounded mb-4">Login</button>
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="w-full bg-green-500 p-2 rounded"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}
