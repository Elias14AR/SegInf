import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../lib/auth'  // Importa la función de autenticación

const Profile = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirigir al login si no está autenticado
    if (!isAuthenticated()) {
      router.push('/login')  // Redirige al login si no está autenticado
    }
  }, [])

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Información del usuario</p>
    </div>
  )
}

export default Profile
