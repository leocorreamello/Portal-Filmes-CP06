import { useState } from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Contato() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Seu nome é ${nome}, seu e-mail é ${email} a mensagem é ${mensagem}`);

        setNome('');
        setEmail('');
        setMensagem('');
    };

    return (
        <div className="flex flex-col items-center mt-20 px-4">
            <h1 className="text-3xl font-bold mb-4 text-white">Entre em Contato</h1>
            <p className="text-lg text-center mb-8 text-white">
                Estamos aqui para ajudar! Envie-nos suas dúvidas, sugestões ou feedback, e responderemos o mais rápido possível.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <label htmlFor="nome" className="mb-2 text-gray-700">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    className="mb-4 p-3 border rounded-lg text-gray-700 placeholder-gray-400"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <label htmlFor="email" className="mb-2 text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    className="mb-4 p-3 border rounded-lg text-gray-700 placeholder-gray-400"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="mensagem" className="mb-2 text-gray-700">Mensagem:</label>
                <textarea
                    id="mensagem"
                    cols="30"
                    rows="10"
                    className="mb-4 p-3 border rounded-lg text-gray-700 placeholder-gray-400"
                    placeholder="Sua mensagem"
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                >
                </textarea>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-300">Enviar</button>
            </form>
            <div className="flex flex-col items-center mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">Outras formas de contato</h2>
                <div className="flex space-x-4">
                    <a href="tel:+1234567890" className="text-white hover:text-blue-500 transition duration-300">
                        <FaPhone size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-blue-500 transition duration-300">
                        <FaEnvelope size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-blue-500 transition duration-300">
                        <FaFacebook size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-blue-500 transition duration-300">
                        <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-blue-500 transition duration-300">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
        </div>
    );
}