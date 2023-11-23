/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../../axios'
import { UserStateContext } from '../../context/ContextProvaider'

export default function ShowStudents() {

  const {admin} = UserStateContext();
  const [students, setStudent] = useState([]);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    axiosClient.get('show_students')
    .then(({data}) => {
      setStudent(data);
    })
    .catch(e => console.log(e));
  })

  if(!admin) {
    return <Navigate to='/auth/dashborad'/>
  }


  function deleteStudent(id) {

  }

  
  return (
    <div id="users_suggestions">
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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Pregled učenika</h1>
        <p className="mb-6 mt-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ovdje možete pregledati ili ukloniti učenike.</p>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 mx-10">
        <div className="col-span-full  p-4 text-center">

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                            Ime učenika
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Prezime učenika
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Datum rođenja
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                            E-mail adresa
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Akcija
                        </th>
                    </tr>
                </thead>
                <tbody>

                  {students.length ? (
                    students.map((student, index) => {
                      const birtDate = new Date(student.birth_date);
                      return <React.Fragment key={index}>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 text-center">
                            {student.name}
                        </th>
                        <td className="px-6 py-4 text-center">
                            {student.surname}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {birtDate.toLocaleDateString(undefined, dateFormatOptions)} 
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
                            {student.email}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                          type="submit"
                          onClick={() => {deleteStudent(student.id)}}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Ukloni
                          </button>
                        </td>
                      </tr>
                      </React.Fragment>
                    })
                  ) : (
                    <h1>Nema podatak</h1>
                  )}

                </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
