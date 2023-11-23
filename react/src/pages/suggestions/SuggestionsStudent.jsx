/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../../axios'

export default function SuggestionsStudent() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    axiosClient.post('save_suggestion', {
      title:title,
      content:content
    })
    .then(() => {
      toast.success('Prijedlog uspješno pohranjen!');
      setTitle('');
      setContent('');
    
    })
    .catch((e) => {
      let errors = e.response.data.errors;
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key]}`);
      });
    });


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
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Vaši prijedlozi</h1>
      <p className="mb-6 mt-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ovdje možete ostaviti Vaš prijedlog za poboljšanje rada aplikacije ili našeg Doma.</p>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12 mx-10">
      <div className="col-span-full  p-4 text-center">

        <div className="w-full md:w-96 md:max-w-full mx-auto">
          <div className="p-6 sm:rounded-md shadow-2xl">

            <form method="POST" onSubmit={onSubmit}>
              <label className="block mb-6">
                <span className="text-gray-700">Naslov</span>
                <input
                  onChange={(e) => {setTitle(e.target.value)}}
                  value={title}
                  name="title"
                  type="text"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Unesi naslov"
                  required
                />
              </label>
              <label className="block mb-6">
                <span className="text-gray-700">Prijedlog</span>
                <textarea
                  onChange={(e) => {setContent(e.target.value)}}
                  value={content}
                  name="content"
                  type="textarea"
                  className=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Unesi svoj prijedlog"
                  required
                  rows="4"
                  cols="50"
                />
              </label>
              <div className="mb-6">
                <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Pošalji
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
