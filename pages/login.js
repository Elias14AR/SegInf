import { useState } from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Realizar la solicitud POST para iniciar sesión
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: email, contrasena: password }),
    })

    const data = await response.json()

    if (response.ok) {
      // Si la respuesta es exitosa, redirigir al usuario o hacer algo más
      alert('Login exitoso')
      // Aquí puedes guardar el token JWT en el localStorage o en el contexto de tu aplicación
    } else {
      // Si hay un error, mostrarlo
      setError(data.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-10 bg-blue-200">
        <h1 className="text-center text-3xl text-white">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="mt-6 max-w-sm mx-auto">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 py-2 text-white rounded">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  )
}

export default Login
