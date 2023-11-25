/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../../axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';


export default function AddStudent() {

  const [student, setStudent] = useState({
    name:'',
    surname:'',
    email:'',
    password:'',
    password_confirmed:'',
    birth_date:''
  });

  const navigate = useNavigate();
  const {admin} = UserStateContext();

  if(!admin) {
    return <Navigate to='/auth/dashboard'/>
  }

  function onSubmit(e) {
    e.preventDefault();

    if(!window.confirm('Jeste li sigurni da želite dodati novog učenika?')) {
      return false;
    }

    axiosClient.post('add_student' , {
      name: student.name,
      surname: student.surname,
      email: student.email,
      password: student.password,
      password_confirmation: student.password_confirmed,
      birth_date: student.birth_date
    })
    .then(() => {
      toast.success('Učenik uspješno dodan');
      setTimeout(() => {
        navigate('/auth/show-students');
      }, 3000);
    })
    .catch((e) => {
      let errors = e.response.data.errors;
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key]}`);
      });
    });

  }


  return (
    <div id="add_students">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
      <div className='flex flex-col justify-center items-center mt-12'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Dodaj učenika</h1>
        <p className="mb-6 mt-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ovdje možete dodati novog učenika.</p>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 mx-10">
        <div className="col-span-full  p-4 text-center">

          <div className="w-full max-w-3xl mx-auto">
            <div className="p-10 sm:rounded-md shadow-2xl">


              <form onSubmit={onSubmit} className="w-full max-w-3xl mx-auto">
                
                {/* IME */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                      Ime
                    </label>
                    <input onChange={(e) => setStudent({...student, name: e.target.value})} value={student.name} name="name" id="name" required className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ime učenika"/>
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="surname">
                      Prezime
                    </label>
                    <input onChange={(e) => setStudent({...student, surname: e.target.value})} value={student.surname} name="surname" id="surname" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Prezime učenika"/>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                      E-mail
                    </label>
                    <div className="relative">
                    <input onChange={(e) => setStudent({...student, email: e.target.value})} value={student.email} name="email" id="email" required type="email" placeholder='ucenikov@email.adresa' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                    </div>
                    <p className="text-gray-600 text-xs italic mt-2">Prezime učenika i njegova godina rođenja</p>
                  </div>
                </div>


                <div className="flex flex-wrap -mx-3 mb-2">

                  {/* LOZINKA */}
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Lozinka
                    </label>
                    <input onChange={(e) => setStudent({...student, password: e.target.value})} value={student.password} name="password" id="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Lozinka" required/>
                  </div>

                  {/* PONOVI LOZINKU */}
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password_confirmed">
                      Ponovi lozinku
                    </label>
                    <input onChange={(e) => setStudent({...student, password_confirmed: e.target.value})} value={student.password_confirmed} name="password_confirmed" id="password_confirmed" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="Ponovi lozinku" required/>
                  </div>

                  {/* DATUM ROĐENJA */}
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birth_date">
                      Datum rođenja
                    </label>
                    <input
                    onChange={(e) => setStudent({...student, birth_date: e.target.value})}
                    value={student.birth_date}
                    required
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </div>

                </div>

                <div className="mb-6">
                  <button
                  type="submit"
                  className="inline-flex w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Kreiraj
                  </button>
                </div>

              </form>



            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
