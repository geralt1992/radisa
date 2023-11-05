/* eslint-disable no-unused-vars */
import React from 'react'
import {
    Typography,
    Button 
  } from "@material-tailwind/react";

export default function CreateSurvey() {
  return (
    <>
    
     <div className="mx-0 mt-20 px-10 py-20 shadow-lg lg:mx-80">
               
            <Typography variant="h4" color="blue">
                Stvori upitnik
            </Typography>
            <Typography color="black" className="mt-3 font-normal mb-10">
                Opći podatci o upitniku
            </Typography>

            <form className="space-y-10 bg-white px-12 py-32 sm:p-6 ">
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
                            value=''
                            
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
                            value=''
                            
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
                            value="#"
                            
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
                                    checked='#'
                                    
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
          
            </form>
         
    </div>

    </>
   
  )
}
