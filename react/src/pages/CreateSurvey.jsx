/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axiosClient from '../axios'
import {
    Typography,
  } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateSurvey() {

    const [survey, setSurvey] = useState({
        title: '',
        description: '',
        image: null,
        expire_date: '',
        status: false,
        questions: [] 
    })


    function onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", survey.title);
        formData.append("status", survey.status);
        formData.append("description", survey.description);
        formData.append("image", survey.image);
        formData.append("expire_date", survey.expire_date);
        // Convert the questions array to a JSON string
        formData.append("questions", JSON.stringify(survey.questions));
        

        // ZBG SLIKE TREBA!
        const headers = { "Content-Type": "multipart/form-data" };
        
        axiosClient.post('save_survey', formData, {headers})
        .then(({data}) => {
            console.log(data);
        })
        .catch((e) => {
            let errors = e.response.data.errors;
            Object.keys(errors).forEach((key) => {
              toast.error(`${errors[key]}`);
            });
        });


       
        
    }


  return (
    <>
    
     <div className="mx-0 mt-20 px-10 py-20 shadow-lg lg:mx-80">
            <div id="surveyTitleData">   
                <Typography variant="h4" color="blue">
                    Stvori upitnik
                </Typography>
                <Typography color="black" className="mt-3 font-normal mb-10">
                    Opći podatci o upitniku
                </Typography>
            </div> 

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

            <form className="space-y-10 bg-white px-12 py-32 sm:p-6" onSubmit={onSubmit}>
                    {/*Image*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor='image'>
                                Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                <button
                                    type="button"
                                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <input
                                    type="file"
                                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                    id='image'
                                    onChange={(e) => {setSurvey({ ...survey, image: e.target.files[0] })}}
                                    />
                                    Add
                                </button>
                            </div>
                        </div>
                    {/*Image*/}

                    {/*Title*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                            >
                                Survey Title
                            </label>
                            <input
                            required
                            type="text"
                            name="title"
                            id="title"
                            value={survey.title}
                            onChange={(e) => {setSurvey({...survey, title: e.target.value})}}
                            placeholder="Survey Title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            />
                        </div>
                    {/*Title*/}


                    {/*Description*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            
                            <textarea
                            name="description"
                            id="description"
                            required
                            value={survey.description}
                            onChange={(e) => {setSurvey({...survey, description: e.target.value})}}
                            placeholder="Describe your survey"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            ></textarea>
                        </div>
                    {/*Description*/}

                    {/*Expire Date*/}
                        <div className="col-span-6 sm:col-span-3">
                            <label
                            htmlFor="expire_date"
                            className="block text-sm font-medium text-gray-700"
                            >
                                Expire Date
                            </label>
                            <input
                            required
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            value={survey.expire_date}
                            onChange={(e) => {setSurvey({...survey, expire_date: e.target.value})}}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            />
                        </div>
                    {/*Expire Date*/}

                    {/*Active*/}
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="status"
                                    name="status"
                                    type="checkbox"
                                    checked={survey.status}
                                    onChange={(e) => {setSurvey({...survey, status:e.target.value})}}
                                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="comments"
                                    className="font-medium text-gray-700"
                                >
                                    Active
                                </label>
                                <p className="text-gray-500">
                                    Whether to make survey publicly available
                                </p>
                            </div>
                        </div>
                    {/*Active*/}
                   
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"> Button </button>
            </form>
         
    </div>

    </>
   
  )
}
