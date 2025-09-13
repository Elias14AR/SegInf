// pages/api/admin/getUsers.js
import connectDB from '../../../lib/dbConnect'
import User from '../../../models/User'

connectDB()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await User.find() // Obtiene todos los usuarios
      return res.status(200).json({ users })
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener los usuarios' })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
