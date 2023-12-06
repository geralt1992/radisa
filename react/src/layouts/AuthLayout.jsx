/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserStateContext } from '../context/ContextProvaider';
import axiosClient from '../axios';
import Sidebar from '../components/Sidebar';


export default function AuthLayout() {
  const { token, user, setUser, setAdmin, setToken } = UserStateContext();
  const logoutTimeoutDuration = 1000 * 60 * 60; // 60 min


  useEffect(() => {
    axiosClient.get('me')
      .then(({ data }) => {
        setUser(data.user);
        setAdmin(data.admin);
      })
      .catch((e) => console.log(e));
  }, []);


  //Logout user after 60 min
  useEffect(() => {
   const logoutTimeout = setTimeout(() => {
        setToken(null);
        setUser({});
        setAdmin(false);
    }, logoutTimeoutDuration); 

    return () => clearTimeout(logoutTimeout);

  }, [setToken, setUser, setAdmin])


  if (!token) {
    return <Navigate to="/" />;
  }

  return (
  <>
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 overflow-scroll">
        <Outlet />  
      </div>
    </div>
  </>
  );
}