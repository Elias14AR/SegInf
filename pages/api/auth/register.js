import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import connectDB from '../../../lib/dbConnect'

connectDB()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre_usuario, correo, contrasena, role } = req.body

    // Verificar si el correo ya existe
    const userExists = await User.findOne({ correo })
    if (userExists) return res.status(400).json({ message: 'Correo ya registrado' })

    // Si el correo es el tuyo, asigna el rol de admin
    const assignedRole = correo === 'tu-email@dominio.com' ? 'admin' : role || 'user'

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(contrasena, salt)

    try {
      // Crear el nuevo usuario, asignando el role
      const user = new User({
        nombre_usuario,
        correo,
        contrasena: hashedPassword,
        role: assignedRole,
      })

      await user.save()

      return res.status(201).json({ message: 'Usuario registrado exitosamente' })
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error)
      return res.status(500).json({ message: 'Error al registrar el usuario' })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
