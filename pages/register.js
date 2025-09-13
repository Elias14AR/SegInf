// pages/register.js
import { useState } from 'react'
import Navbar from '../components/Navbar'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')  // Default role is 'user'
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_usuario: username, correo: email, contrasena: password, role: role }), // Send role
    })

    const data = await response.json()

    if (response.ok) {
      alert('Usuario registrado con éxito')
      // Después de registrar al usuario, redirigir a la página de login
      window.location.href = '/login'
    } else {
      setError(data.message || 'Error al registrar usuario')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="p-10 bg-blue-200">
        <h1 className="text-center text-3xl text-white">Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className="mt-6 max-w-sm mx-auto">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-white">Rol</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-500 py-2 text-white rounded">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register
