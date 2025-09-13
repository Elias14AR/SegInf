// pages/index.js
import { useEffect, useState } from 'react'
import Link from 'next/link'

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar si hay un token JWT en el localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)  // Si el token está presente, el usuario está autenticado
    }
  }, [])

  const handleLogout = () => {
    // Eliminar el token JWT del localStorage
    localStorage.removeItem('token')
    // Redirigir al login
    window.location.href = '/login'
  }

  return (
    <div>
      <h1>Bienvenidos a MMA Blog</h1>
      <p>El blog más actualizado sobre MMA.</p>

      <div>
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="text-blue-500">
              Iniciar sesión
            </Link>
            <br />
            <Link href="/register" className="text-blue-500">
              Registrar usuario
            </Link>
          </>
        ) : (
          <>
            <Link href="/admin" className="text-blue-500">
              Ir a la administración
            </Link>
            <br />
            <button onClick={handleLogout} className="text-red-500">
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
