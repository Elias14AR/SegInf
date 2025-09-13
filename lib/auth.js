export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    // Verifica si el token está almacenado en localStorage
    const token = localStorage.getItem('token')
    return token ? true : false
  }
  return false
}

export const logout = () => {
  // Eliminar el token de localStorage
  localStorage.removeItem('token')
}
