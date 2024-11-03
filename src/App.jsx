import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user && location.pathname !== '/register' && location.pathname !== '/login') {
            navigate('/login');
        }

        // Apply theme based on user preference
        const theme = localStorage.getItem('theme');
        if (theme) {
            document.body.classList.toggle('dark', theme === 'dark');
        }
    }, [navigate, location]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
