/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../../axios'
import UserSvg from '../../components/svgs/UserSvg'
import { motion } from "framer-motion";
import { containerVariant } from "../../components/variants/variants";
import Header from '../../components/Header';

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
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <UserSvg/>
      </div>

      <motion.div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center"
      variants={containerVariant}
      initial="hidden"
      animate="show" 
      >
        <div className="max-w-md w-full p-6">
          <div className="pb-6">
          <Header title="Vaši prijedlozi" subtitle="Ovdje možete ostaviti Vaš prijedlog za poboljšanje rada aplikacije ili našeg Doma" />
           
            <form method="POST" onSubmit={onSubmit}>
                  <label className="block mb-6 font-light leading-relaxed text-gray-600 ">
                    <span >Naslov</span>
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
                  <label className="block mb-6 font-light leading-relaxed text-gray-600">
                    <span >Prijedlog</span>
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
      </motion.div>

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
    </div>
  )
}
