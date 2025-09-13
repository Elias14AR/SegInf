import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    default: '',
  },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
    