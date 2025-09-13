// pages/api/admin/updateRole.js
import connectDB from '../../../lib/dbConnect'
import User from '../../../models/User'

connectDB()

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { userId, newRole } = req.body

    // Verificar que el rol que se quiere asignar sea admin o user
    if (!['user', 'admin'].includes(newRole)) {
      return res.status(400).json({ message: 'Rol inválido' })
    }

    try {
      // Buscar al usuario por su id y actualizar el rol
      const updatedUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true })

      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      return res.status(200).json({ message: 'Rol actualizado', user: updatedUser })
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar el rol', error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
