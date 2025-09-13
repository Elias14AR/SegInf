// pages/logout.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    // Eliminar el token JWT del localStorage
    localStorage.removeItem('token')

    // Redirigir a la página de login
    router.push('/login')
  }, [])

  return (
    <div>
      <h1>Cerrando sesión...</h1>
    </div>
  )
}

export default Logout
