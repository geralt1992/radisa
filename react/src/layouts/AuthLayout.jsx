import { useEffect } from 'react';
import { Navigate, Outlet, Link} from 'react-router-dom';
import { UserStateContext } from '../context/ContextProvaider';
import axiosClient from '../axios';

export default function AuthLayout() {
  const { token, setToken, user, setUser, setAdmin, admin } = UserStateContext();

  useEffect(() => {
    axiosClient.get('me')
      .then(({ data }) => {
        setUser(data.user);
        setAdmin(data.admin);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
   // Code to run when the component is mounted (equivalent to DOMContentLoaded)
   // Obtain all the main options with dropdowns
   const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");

   // Add a click event to each main option
   opcionesConDesplegable.forEach(function (opcion) {
     opcion.addEventListener("click", function () {
       // Get the dropdown associated with the option
       const desplegable = opcion.querySelector(".desplegable");

       // Toggle the "hidden" class to show or hide the dropdown
       desplegable.classList.toggle("hidden");
     });
   });

   // Don't forget to remove event listeners when the component is unmounted
   return () => {
     opcionesConDesplegable.forEach(function (opcion) {
       opcion.removeEventListener("click", function () {
         // Your cleanup logic here if needed
       });
     });
   }
 }, []); // The empty dependency array ensures this effect runs once, like DOMContentLoaded

  if (!token) {
    return <Navigate to="/" />;
  }

  function logout(e) {
    e.preventDefault();
    setToken(null);
    setUser({});
    setAdmin(false);
  }

  return (
    // <div className="flex h-screen">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-gray-800 p-6">
    //     <div className="text-white font-bold text-xl mb-4">My App</div>
    //     <ul>

    //     {/* ADMIN */}
    //     {admin && (
    //     <div className='text-white'>
    //       <p >Welcome, Admin!</p> <br />
    //       <Link to="/auth/admin">
    //         <button className='p-2 bg-slate-300'>Go to admin</button>
    //       </Link>
    //     </div>
    //   )}

    //     <li className="mb-2">
    //       <button
    //         onClick={logout}
    //         className="text-white hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    //       >
    //         Logout
    //       </button>
    //     </li>
    //       {/* Add more sidebar items as needed */}
    //     </ul>
    //   </div>

      

    //   {/* Main Content */}
    //   <div className="flex-1 p-6">
    //     <div className="mb-4">AuthLayout - Hi {user.name}</div>
    //     <Outlet />
    //   </div>
    // </div>

<>

    <div>
  {/* <nav class="bg-blue-500 p-4 flex items-center justify-between">
    <div>
      <h1 class="text-white text-xl font-semibold">SALUD 360</h1>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-white">Bienvenido</span>
      <i class="fas fa-user-circle text-white text-2xl"></i>
    </div>
  </nav> */}

  <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
    <nav>
      <ul class="space-y-2">
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-calendar-alt mr-2"></i>
              <span>Agenda</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Gestion de citas
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Polizas
              </a>
            </li>
          </ul>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-money-bill-wave mr-2"></i>
              <span>Contabilidad</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Tratamientos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Gastos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Facturas
              </a>
            </li>
          </ul>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-chart-bar mr-2"></i>
              <span>Informes</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Presupuestos
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Informe médico
              </a>
            </li>
          </ul>
        </li>
        <li class="opcion-con-desplegable">
          <div class="flex items-center justify-between p-2 hover:bg-gray-700">
            <div class="flex items-center">
              <i class="fas fa-file-alt mr-2"></i>
              <span>Documentación</span>
            </div>
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
          <ul class="desplegable ml-4 hidden">
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Firmas pendientes
              </a>
            </li>
            <li>
              <a href="#" class="block p-2 hover:bg-gray-700 flex items-center">
                <i class="fas fa-chevron-right mr-2 text-xs"></i>
                Documentos
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>

  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">¡Bienvenido al CRM de Mi Empresa!</h1>
    <p>En esta sección encontrarás todo lo que necesitas para administrar tus clientes y ventas de manera eficiente.</p>
  </main></div>
</>
  );
}