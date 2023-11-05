/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserStateContext } from '../context/ContextProvaider';
import axiosClient from '../axios';
import Sidebar from '../components/Sidebar';
// import Admin from '../pages/Admin'


export default function AuthLayout() {
  const { token, user, setUser, setAdmin } = UserStateContext();
 
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


  return (
  <>
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-scroll">
        {/* <div>Dobrodošao {user.name}</div> */}
          {/* CHECK IF USER IS ADMIN, IF IS IT SHOW ADMIN PAGE */}
            {/* {admin ? (
              <>
                <Admin />
                <Outlet />
                </>
              ) : (
                <Outlet />
              )
            } */}
          <Outlet />  
        </div>
      </div>
  </>
  );
}