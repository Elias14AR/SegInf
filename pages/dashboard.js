import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../lib/auth'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')  // Redirige si no está autenticado
    }
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido al dashboard, solo accesible para usuarios autenticados.</p>
    </div>
  )
}

export default Dashboard
