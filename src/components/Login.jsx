export default function Login({ isLogged, handleLogin }) {


    return (
        <div className="flex gap-4 items-center">
            {isLogged && <p>Olá, usuário</p>}
            <button
                onClick={handleLogin}
                className={`${isLogged ? "bg-white" : "bg-zinc-900"} text-white px-4 py-1 rounded`}>
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    )
}