// pages/api/admin/deleteUser.js
import connectDB from '../../../lib/dbConnect'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

connectDB()

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    // Verificar el token JWT
    const token = req.headers.authorization?.split(' ')[1]  // Obtener el token del encabezado
    if (!token) return res.status(401).json({ message: 'No autorizado' })

    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' })
      }

      const { userId } = req.body

      // Buscar al usuario por su id y eliminarlo
      const deletedUser = await User.findByIdAndDelete(userId)

      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      return res.status(200).json({ message: 'Usuario eliminado' })
    } catch (error) {
      console.error('❌ Error en la verificación del token:', error)
      return res.status(500).json({ message: 'Error al verificar el token', error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
