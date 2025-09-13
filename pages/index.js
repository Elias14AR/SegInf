import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="bg-blue-200 p-10 text-center">
        <h1 className="text-4xl text-white">Bienvenidos a MMA Blog</h1>
        <p className="mt-4 text-white">El blog más actualizado sobre MMA.</p>
      </main>
    </div>
  )
}
