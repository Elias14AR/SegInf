import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <Link href="/" className="text-white text-xl">
          MMA Blog
        </Link>
        <div className="flex space-x-4">
          <Link href="/login" className="text-white">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="text-white">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
