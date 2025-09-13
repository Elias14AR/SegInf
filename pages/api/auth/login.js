import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../../models/User'
import connectDB from '../../../lib/dbConnect'

connectDB()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { correo, contrasena } = req.body

    // Verificar si el usuario existe
    const user = await User.findOne({ correo })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(contrasena, user.contrasena)
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

    // Crear el token JWT
    const token = jwt.sign(
      { id: user._id, nombre_usuario: user.nombre_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({ token })
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
