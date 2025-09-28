import { login } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ahorrosImage from "../assets/AhorrosLogin.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const user = await login(email, password); // 👈 llamada al backend
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Error desconocido");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Sección del formulario - Mitad izquierda */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            Iniciar Sesión
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="tu@email.com"
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Tu contraseña"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium text-sm"
                        >
                            Iniciar Sesión
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            ¿No tienes una cuenta?{" "}
                            <a 
                                href="/register" 
                                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                            >
                                Regístrate aquí
                            </a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Sección de la imagen - Mitad derecha */}
            <div className="flex-1 relative hidden lg:block bg-gradient-to-br from-blue-600 to-blue-800">
                <img 
                    src={ahorrosImage} 
                    alt="DuoSave - Gestión de Ahorros"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={() => console.log('Imagen cargada correctamente')}
                    onError={(e) => {
                        console.error('Error al cargar la imagen');
                        // Si falla, mantener el gradiente de fondo
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center"></div>
            </div>
        </div>
    );
}
