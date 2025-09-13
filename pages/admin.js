import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../lib/auth'
import Link from 'next/link'

const AdminPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || JSON.parse(atob(token.split('.')[1])).role !== 'admin') {
      router.push('/login')  // Redirige al login si no es admin
    } else {
      fetchUsers()  // Obtiene los usuarios si es admin
    }
  }, [])

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/getUsers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    
    const data = await response.json()

    if (response.ok) {
      setUsers(data.users)
    } else {
      setError(data.message || 'Error al obtener usuarios')
    }
  }

  const updateUserRole = async (userId, newRole) => {
    const response = await fetch('/api/admin/updateRole', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ userId, newRole }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Rol actualizado con éxito')
      fetchUsers() // Refresca la lista de usuarios después de la actualización
    } else {
      alert(data.message || 'Error al actualizar el rol')
    }
  }

  const deleteUser = async (userId) => {
    const response = await fetch('/api/admin/deleteUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ userId }),
    })

    const data = await response.json()

    if (response.ok) {
      alert('Usuario eliminado con éxito')
      fetchUsers() // Refresca la lista después de eliminar
    } else {
      alert(data.message || 'Error al eliminar el usuario')
    }
  }

  return (
    <div>
      <h1>Gestión de Usuarios (Solo para Administradores)</h1>

      {/* Enlace para regresar al inicio */}
      <Link href="/">
        <a className="text-blue-500">Regresar al inicio</a>
      </Link>

        <Link href="/logout">
        <a className="text-red-500">Cerrar sesión</a>
        </Link>


      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nombre_usuario}</td>
              <td>{user.correo}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => updateUserRole(user._id, user.role === 'user' ? 'admin' : 'user')}
                >
                  Cambiar a {user.role === 'user' ? 'admin' : 'user'}
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage
