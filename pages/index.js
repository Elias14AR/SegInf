import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token JWT en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Si el token está presente, el usuario está autenticado
    }
  }, []);

  const handleLogout = () => {
    // Eliminar el token JWT del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    window.location.href = '/login';
  };

  return (
    <div className="main-content">
      {/* Navbar */}
      <nav>
        <div className="nav-wrapper">
          <ul className="left hide-on-med-and-down">
            <li>
              <Link href="/login">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link href="/register">
                Registrar usuario
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div>
        <h1>Bienvenidos a MMA Blog</h1>
        <p>El blog más actualizado sobre MMA.</p>

        <div>
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                Iniciar sesión
              </Link>
              <br />
              <Link href="/register">
                Registrar usuario
              </Link>
            </>
          ) : (
            <>
              <Link href="/admin">
                Ir a la administración
              </Link>
              <br />
              <button onClick={handleLogout} className="text-red-500">
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        <h4 className="cent">Ranking Libra por libra actual</h4>

        <div className="cent">
          <div className="colp s12 m7">
            <h2 className="c">#1 Islam Makachev</h2>
            <div className="card horizontal">
              <div className="card-image">
                <img src="/images/Islam.avif" alt="Islam Makachev" />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="centered">
                    <tbody>
                      <tr>
                        <td>EST/PES</td>
                        <td>1.78 m, 70 kg</td>
                      </tr>
                      <tr>
                        <td>FDN</td>
                        <td>27/10/1991 (32)</td>
                      </tr>
                      <tr>
                        <td>EQUIPO</td>
                        <td>Eagles MMA</td>
                      </tr>
                      <tr>
                        <td>GUARDIA</td>
                        <td>Southpaw</td>
                      </tr>
                      <tr>
                        <td>ALCANCE</td>
                        <td>1.79 m</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="striped">
          <thead className="centered">
            <tr>
              <th className="cent">Posición</th>
              <th className="cent">Nombre</th>
              <th className="cent">Apodo</th>
              <th className="cent">División</th>
              <th className="cent">Record Actual</th>
              <th className="cent">País</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cent">1</td>
              <td className="cent">Islam Makachev (C)</td>
              <td className="cent">N-A</td>
              <td className="cent">Peso Ligero</td>
              <th className="cent">25-1-0</th>
              <th className="cent">Rusia</th>
            </tr>
            <tr>
              <td className="cent">2</td>
              <td className="cent">Jon Jones (C)</td>
              <td className="cent">Bones</td>
              <td className="cent">Peso Pesado</td>
              <th className="cent">25-1-0</th>
              <th className="cent">USA</th>
            </tr>
            <tr>
              <td className="cent">3</td>
              <td className="cent">Leon Edwards (C)</td>
              <td className="cent">Rocky</td>
              <td className="cent">Peso Welter</td>
              <th className="cent">22-3-0</th>
              <th className="cent">Inglaterra</th>
            </tr>
            <tr>
              <td className="cent">4</td>
              <td className="cent">Alex Pereira (C)</td>
              <td className="cent">Poatan</td>
              <td className="cent">Peso Semipesado</td>
              <th className="cent">10-2-0</th>
              <th className="cent">Brasil</th>
            </tr>
            <tr>
              <td className="cent">5</td>
              <td className="cent">Ilia Topuria (C)</td>
              <td className="cent">El matador</td>
              <td className="cent">Peso Pluma</td>
              <th className="cent">15-0-0</th>
              <th className="cent">España</th>
            </tr>
            <tr>
              <td className="cent">6</td>
              <td className="cent">Sean O'Malley (C)</td>
              <td className="cent">Suga</td>
              <td className="cent">Peso Gallo</td>
              <th className="cent">18-1-0</th>
              <th className="cent">USA</th>
            </tr>
            <tr>
              <td className="cent">7</td>
              <td className="cent">Alexander Volkanovski</td>
              <td className="cent">The great</td>
              <td className="cent">Peso Pluma</td>
              <th className="cent">26-4-0</th>
              <th className="cent">Australia</th>
            </tr>
            <tr>
              <td className="cent">8</td>
              <td className="cent">Max Holloway</td>
              <td className="cent">Blessed</td>
              <td className="cent">Peso Pluma</td>
              <th className="cent">26-7-0</th>
              <th className="cent">Hawai</th>
            </tr>
            <tr>
              <td className="cent">9</td>
              <td className="cent">Dricus Du Plessis (C)</td>
              <td className="cent">N-A</td>
              <td className="cent">Peso Medio</td>
              <th className="cent">21-2-0</th>
              <th className="cent">Sudáfrica</th>
            </tr>
            <tr>
              <td className="cent">10</td>
              <td className="cent">Alexandre Pantoja (C)</td>
              <td className="cent">The cannibal</td>
              <td className="cent">Peso Mosca</td>
              <th className="cent">28-5-0</th>
              <th className="cent">Brasil</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
