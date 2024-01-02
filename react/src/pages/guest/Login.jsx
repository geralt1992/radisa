/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { UserStateContext } from '../../context/ContextProvaider';
import logo from '../../assets/logo2.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser, setToken, setAdmin} = UserStateContext();
  const [isAdminCreated, setIsAdminCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('is_admin_created')
    .then(({data}) => {
      setIsAdminCreated(data);
      setLoading(false);
    })
    .catch(e => console.log(e));
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    axiosClient.post('login' , {
      email:email,
      password:password
    })
    .then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setAdmin(data.admin);
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data.msg) {
          toast.error(error.response.data.msg);
        } else (error.response.data.errors) 
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
          finalErrors.forEach((e) => toast.error(e));
          console.log(error);
        }
    });

  }

  function createAdmin(e) {
    e.preventDefault();
    axiosClient.get('create_admin')
    .then(({data}) => {
      toast.success(data);
      setIsAdminCreated(true);
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo} 
            alt="Učenički dom Hrvatskoga radiše Osijek"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Prijavi se na svoj račun
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {!loading ? (
          isAdminCreated ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email adresa
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Lozinka
                  </label>
                  <div className="text-sm">
                    <span onClick={() => toast.warning('Ukoliko imate problem s lozinkom pošaljite upit na ovaj mail: radisa@gmail.com')} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Zaboravljena lozinka
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Prijavi se
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={createAdmin}
              className="mt-8 flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Stvori Admina
            </button>
          )
        ) : (
          <span>Loading...</span>
        )}
          
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     </>
   )
}
