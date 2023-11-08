/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axiosClient from '../axios'
import {
    Typography,
  } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    PlusIcon,
    TrashIcon
  } from "@heroicons/react/24/solid";

import uuid from 'react-uuid';



export default function CreateSurvey() {

    const [survey, setSurvey] = useState({
        title: '',
        description: '',
        image: null,
        expire_date: '',
        status: false,
        questions: [] 
    });

    const [newQuestions, setNewQuestions] = useState([]);
    const questionTypes = ['text' , 'radio' , 'checkbox' , 'select'];

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

    function addQuestion() {
        const newQuestion = {
            id: uuid(),
            type: "text",
            question: "",
            description: "",
            data: {options:[]},
        }

        const updatedQuestions = [...newQuestions, newQuestion];
        setNewQuestions(updatedQuestions);
    }

    function deleteQuestion(question) {
        setNewQuestions((prevQuestions) => {
            const updatedQuestions = prevQuestions.filter((q) => q.id !== question.id);
            return updatedQuestions;
        })
    }

    function addOption(question) {
        const newOption = { id: uuid(), optionText: '' };
        setNewQuestions((prevQuestions) => {
            return prevQuestions.map((q) => {
                if (q.id === question.id) {
                    //Za ući i updejtati dubinu objekta ili polja
                    //prepisali smo q, prčkat ćemo po data, ušli smo u data, prepisali postojeći data, prčkat ćemo po optionsima, ušlismo u optionse, prepisujemo stare optionse i daojemo novi option
                    return {...q, data: { ...q.data, options: [...q.data.options, newOption]}};
                }
                return q;
            });
        });
    }

    function onOptionUpdate(ev, question, option) {
        setNewQuestions((prevQuestions) => {
            return prevQuestions.map((q) => {
                if(q.id === question.id) {
                   const selectedQuestionOptions = q.data.options;
                   selectedQuestionOptions.forEach((opt) => {
                    if(opt.id === option.id) {
                        opt.optionText = ev.target.value;
                    }
                    return opt;
                   })
                }
                return q;
            })
        })
    }


    function deleteOption(question, option) {
        setNewQuestions((prevQuestions) => {
            return prevQuestions.map((q) => {
                if (q.id === question.id) {
                    const updatedOptionsForSelectedQuestion = q.data.options.filter((opt) => opt.id !== option.id);
                    return { ...q, data: { ...q.data, options: updatedOptionsForSelectedQuestion }};
                }
                return q;
            });
        });
    }
   

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

   

  return (
    <>
    
     <div className="mx-0 my-10 px-10 py-20 shadow-lg lg:mx-80">
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


                <div className="flex justify-between mt-5">
                    <h3 className="text-2xl font-bold">Questions</h3>
                    <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addQuestion()}
                    >
                        <PlusIcon className="w-4 mr-3"/>
                        Add question
                    </button>
                </div>

                {newQuestions.length ?  (
                    newQuestions.map((question, index) => {
                      return  <React.Fragment key={question.id}>
                           <div>
                                <div className="flex justify-between my-5 ">
                                    <h4>
                                    {index + 1}. QUESTION
                                    </h4>
                                    <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                                        onClick={() => addQuestion()}
                                    >
                                        <PlusIcon className="w-4" />
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"
                                        onClick={() => deleteQuestion(question)}
                                    >
                                        <TrashIcon className="w-4" />
                                        Delete
                                    </button>
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-between my-5">

                                    {/* Question Text */}
                                    <div className="flex-1">
                                    <label
                                        htmlFor="question"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Question
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="question"
                                        id="question"
                                        value={question.question}
                                        onChange={(e) => {
                                            setNewQuestions((prevQuestions) => {
                                                return prevQuestions.map((q) => {
                                                    if(q.id === question.id) {
                                                        return {...q, question: e.target.value}
                                                    }
                                                    return q;
                                                })
                                            })
                                        }}
                                        className="mt-1 block w-full py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    </div>
                                    {/* Question Text */}

                                    {/* Question Type */}
                                    <div>
                                    <label
                                        htmlFor="questionType"
                                        className="block text-sm font-medium text-gray-700 w-40"
                                    >
                                        Question Type
                                    </label>
                                    <select
                                        id="questionType"
                                        name="questionType"
                                        value={question.type}
                                        onChange={(e) => {
                                            setNewQuestions((prevQuestions) => {
                                                return prevQuestions.map((q) => {
                                                    if(q.id === question.id) {
                                                        return {...q, type: e.target.value}
                                                    }
                                                    return q;
                                                })
                                            })
                                        }}
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >

                                    {questionTypes.map((type) => {
                                      return <option value={type} key={type}>
                                            {upperCaseFirst(type)}
                                        </option>
                                    })}
                                    </select>
                                    </div>
                                    {/* Question Type */}

                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label
                                    htmlFor="questionDescription"
                                    className="block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                    rows="4"
                                    cols="50"
                                    name="questionDescription"
                                    id="questionDescription"
                                    value={question.description}
                                    onChange={(e) => {
                                        setNewQuestions((prevQuestions) => {
                                            return prevQuestions.map((q) => {
                                                if(q.id === question.id) {
                                                    return {...q , description: e.target.value}
                                                }
                                                return q;
                                            })
                                        })
                                    }}

                                    
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                {/* Description */}
                                
                                {/* Check question type */}
                                {
                                (question.type === 'select' || question.type === 'radio' || question.type === 'checkbox') && (
                                    <div>
                                    <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                                        Options
                                        <button
                                        // IMPORTANT
                                        onClick={() => addOption(question)}
                                        type="button"
                                        className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                                        >
                                        Add Option
                                        </button>
                                    </h4>

                                    {question.data.options.length === 0 && (
                                        <div className="text-xs text-gray-600 text-center py-3">
                                        You dont have any options defined
                                        </div>
                                    )}

                                    {question.data.options.length > 0 && (
                                        question.data.options.map((option, index) => {
                                            return <React.Fragment key={option.id}>
                                                 <div className="flex items-center mb-1">
                                                    <span className="w-6 text-sm">{index + 1}</span>
                                                    <input
                                                    required
                                                    type="text"
                                                    value={option.optionText}
                                                    //BITNO BITNO BITNO
                                                    onChange={(ev) => onOptionUpdate(ev, question, option)}
                                                    className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
                                                    />
                                                    <button
                                                    //BITNO BITNO BITNO
                                                    onClick={() => deleteOption(question, option)}
                                                    type="button"
                                                    className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors  hover:border-red-100"
                                                    >
                                                    <TrashIcon className="w-3 h-3 text-red-500" />
                                                    </button>
                                                </div>
                                            </React.Fragment>
                                        })
                                    )}
                                    </div>
                                )
                                }
                
                                        
                                {/* Check question type */}

                            </div>
                            <hr />


                        </React.Fragment> 
                    })
                    
                    

                ) : (
                    <h1>No questions added</h1>
                )}


            </form>
         
    </div>

    </>
   
  )
}
