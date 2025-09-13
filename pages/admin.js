import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../lib/auth'

const AdminPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState([]) // Para almacenar los usuarios
  const [error, setError] = useState('')

  // Obtener los usuarios (esto puede hacerse desde tu backend)
  const fetchUsers = async () => {
    const response = await fetch('/api/admin/getUsers', { // Aquí deberías tener una API para obtener los usuarios
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

  useEffect(() => {
    // Verificar que el usuario esté autenticado y sea admin
    const token = localStorage.getItem('token')
    if (!isAuthenticated() || !token || JSON.parse(atob(token.split('.')[1])).role !== 'admin') {
      router.push('/login')  // Redirige si no es admin
    } else {
      fetchUsers()  // Obtiene los usuarios si es admin
    }
  }, [])

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
      fetchUsers() // Vuelve a obtener los usuarios después de actualizar el rol
    } else {
      alert(data.message || 'Error al actualizar el rol')
    }
  }

  return (
    <div>
      <h1>Gestión de Usuarios (Solo para Administradores)</h1>

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage
