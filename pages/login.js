import { useState } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar la solicitud POST para iniciar sesión
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, contrasena: password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Si la respuesta es exitosa, guardar el token en localStorage
      localStorage.setItem('token', data.token);

      // Verificar si el usuario es admin para redirigir
      const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decodificar el JWT
      if (decodedToken.role === 'admin') {
        window.location.href = '/admin';  // Redirige a la página de administración si es admin
      } else {
        window.location.href = '/';  // Redirige al home si no es admin
      }
    } else {
      setError(data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
