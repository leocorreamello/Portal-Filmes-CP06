import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username or email already exists
        const userExists = users.some(user => user.username === username || user.email === email);
        if (userExists) {
            setError('Nome de usuário ou e-mail já está em uso');
            return;
        }

        // Save new user data to localStorage
        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <form onSubmit={handleRegister} className="bg-gray-700 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Registrar</h2>
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
                    <label className="block mb-2">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="w-full bg-green-500 p-2 rounded">Registrar</button>
            </form>
        </div>
    );
}
