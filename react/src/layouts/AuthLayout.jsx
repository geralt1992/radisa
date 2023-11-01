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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="text-white font-bold text-xl mb-4">My App</div>
        <ul>

        {/* ADMIN */}
        {admin && (
        <div className='text-white'>
          <p >Welcome, Admin!</p> <br />
          <Link to="/auth/admin">
            <button className='p-2 bg-slate-300'>Go to admin</button>
          </Link>
        </div>
      )}

        <li className="mb-2">
          <button
            onClick={logout}
            className="text-white hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-4">AuthLayout - Hi {user.name}</div>
        <Outlet />
      </div>
    </div>
  );
}