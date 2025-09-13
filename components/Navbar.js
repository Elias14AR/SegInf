import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <Link href="/">
          <a className="text-white text-xl">MMA Blog</a>
        </Link>
        <div className="flex space-x-4">
          <Link href="/login">
            <a className="text-white">Iniciar Sesión</a>
          </Link>
          <Link href="/register">
            <a className="text-white">Registrarse</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
