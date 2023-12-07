import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../../axios'
import { UserStateContext } from '../../context/ContextProvaider'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


export default function ShowStudents() {

  const {admin} = UserStateContext();
  const [students, setStudent] = useState([]);
  const [editingStudent, setEditingStudent] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmed: '',
    birth_date: '',
  });
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    axiosClient.get('show_students')
    .then(({data}) => {
      setStudent(data);
    })
    .catch(e => console.log(e));
  },[])

  if(!admin) {
    return <Navigate to='/auth/dashborad'/>
  }

  //RODAL
  function show(student) {
    setEditingStudent({...editingStudent, ...student});
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }
 
  function onSubmitChangeStudentData(e) {
    e.preventDefault();

    axiosClient.post('edit_student' , {
      id: editingStudent.id,
      name: editingStudent.name,
      surname: editingStudent.surname,
      email: editingStudent.email,
      password: editingStudent.password,
      password_confirmation: editingStudent.password_confirmed,
      birth_date: editingStudent.birth_date
    })
    .then(({data}) => {
      setStudent(data);
      toast.success('Podatci uspješno izmijenjeni');
      setVisible(false);
    })
    .catch((e) => {
      let errors = e.response.data.errors;
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key]}`);
      });
    });
  }

  function deleteStudent(id) {
    if(!window.confirm('Jeste li sigurni da želite ukloniti učenika?')) {
      return false;
    }
    
    axiosClient.get(`delete_student/${id}`)
    .then(({data}) => {
      setStudent(data);
      toast.success('Učenik uspješno uklonjen');
    })
    .catch(e => console.log(e));
  }

  function findStudent(e) {
    let search = e.target.value.toLowerCase();
  
    if (search) {
      const filteredStudents = students.filter((student) =>  student.surname && student.surname.toLowerCase().includes(search));
      setStudent(filteredStudents);
    } else {
      axiosClient.get('show_students')  // If the search is empty, reset the state to the original list of students
        .then(({ data }) => {
          setStudent(data);
        })
        .catch(e => console.log(e));
    }
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
    
      <div className='flex flex-col justify-center items-center mt-28'>
        <h1 className="mb-4 text-4xl font-bold tracking-wide text-gray-600 font-mono ">Pregled učenika</h1>

        {/* TRAŽI UČENIKA */}
        <form onChange={findStudent} className="flex items-center w-[40%] mt-6">   
          <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                  </svg>
              </div>
              <input type="text" id="findStudent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Traži učenika po prezimenu..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true"fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </button>
        </form>

      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 mx-10">
        <div className="col-span-full  p-4 text-center">

          {/* TABLICA UČENIKA S AKCIJAMA */}
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
                        <th scope="col" className="px-6 py-3 text-center dark:bg-gray-800">
                            Datum rođenja
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 text-center">
                            E-mail adresa
                        </th>
                        <th scope="col" className="px-6 py-3 text-center dark:bg-gray-800">
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
                        <td className="px-6 py-4 text-center  dark:bg-gray-800">
                          {birtDate.toLocaleDateString(undefined, dateFormatOptions)} 
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
                            {student.email}
                        </td>
                        <td className="px-6 py-4 text-center dark:bg-gray-800">
                          <button
                          type="submit"
                          onClick={() => show(student)}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Izmijeni
                          </button>

                          <button
                          type="submit"
                          onClick={() => {deleteStudent(student.id)}}
                          className="ml-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Ukloni
                          </button>
                        </td>
                      </tr>
                      </React.Fragment>
                    })
                  ) : (
                    <tr>
                      <td>Nema podatak</td>
                    </tr>
                  )}

                </tbody>
            </table>
          </div>

          {/* IZMIJENI PODATKE O UČENIKU */}         
          <Rodal visible={visible} onClose={hide} className='w-full m-0 p-0 '>

              {editingStudent && (
                  <form onSubmit={onSubmitChangeStudentData} className="w-full max-w-3xl mx-auto ">

                  {/* IME */}
                  <div className="flex flex-wrap -mx-3 mb-6 ">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Ime
                      </label>
                      <input onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})} value={editingStudent.name} name="name"  required className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ime učenika"/>
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="surname">
                        Prezime
                      </label>
                      <input onChange={(e) => setEditingStudent({...editingStudent, surname: e.target.value})} value={editingStudent.surname} name="surname" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Prezime učenika"/>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        E-mail
                      </label>
                      <div className="relative">
                      <input onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})} value={editingStudent.email} name="email"  required type="email" placeholder='ucenikov@email.adresa' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
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
                      <input onChange={(e) => setEditingStudent({...editingStudent, password: e.target.value})} value={editingStudent.password} name="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password"/>
                    </div>

                    {/* PONOVI LOZINKU */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password_confirmed">
                        Ponovi lozinku
                      </label>
                      <input onChange={(e) => setEditingStudent({...editingStudent, password_confirmed: e.target.value})} value={editingStudent.password_confirmed} name="password_confirmed" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password"/>
                    </div>

                    {/* DATUM ROĐENJA */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birth_date">
                        Datum rođenja
                      </label>
                      <input
                      onChange={(e) => setEditingStudent({ ...editingStudent, birth_date: e.target.value })}
                      value={editingStudent.birth_date ? editingStudent.birth_date.split(' ')[0] : ''}
                      required
                      type="date"
                      name="birth_date"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                    </div>

                  </div>

                  <div className="mb-6">
                    <button
                    type="submit"
                    className="inline-flex w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Izmijeni
                    </button>
                  </div>

                </form>
              )}
          </Rodal>

        </div>
      </div>
    </div>
  )
}
