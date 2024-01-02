import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import axiosClient from '../../axios'
import { UserStateContext } from '../../context/ContextProvaider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Header from '../../components/Header';

export default function CreateSurvey() {

    const [survey, setSurvey] = useState({
        title: '',
        description: '',
        image: null,
        // expire_date: '',
        questions: [] 
    });

    const [newQuestions, setNewQuestions] = useState([]);
    const questionTypes = ['text' , 'radio' , 'checkbox' , 'select'];
    const {admin} = UserStateContext();
    const navigate = useNavigate();

    //set questions in survey on question update
    useEffect(() => {
        setSurvey((prevSurvey) => ({...prevSurvey, questions: newQuestions}))
    },[newQuestions])
    

    //redirect user from this page if isn't admin
    if(!admin) {
        return <Navigate to='/auth/user-profile'/>
    }

    function onSubmit(e) {
        e.preventDefault();
        
        //1. check - user confirmation
        const confirmation = window.confirm("Jeste li sigurni da želite stvoriti ovu anketu i da su svi podatci točni?");
        if (!confirmation) return false;

        //2. check - is there any question in survey
        if(survey.questions.length === 0) {
            toast.warning('Dodaj pitanja!');
            return false;
        }

        //3. check - if question is check, radio or select type is there any options
        const hasMissingOptions = survey.questions.some((question) => {
            if (question.type === 'radio' || question.type === 'select' || question.type === 'checkbox') {
                if (question.data.options.length === 0) {
                    toast.warning('Dodaj opcije u pitanja s opcijama');
                    return true; 
                }
            }
            return false; 
        });
        
        if (hasMissingOptions) {
            return;
        }
        
        const formData = new FormData();
        formData.append("title", survey.title);
        formData.append("description", survey.description);
        formData.append("image", survey.image);
        // formData.append("expire_date", survey.expire_date);
        // Convert the questions array to a JSON string
        formData.append("questions", JSON.stringify(survey.questions));
        
        // ZBG SLIKE TREBA!
        const headers = { "Content-Type": "multipart/form-data" };
        
        axiosClient.post('save_survey', formData, {headers})
        .then(() => {
            toast.success('Uspješno stvorena anekta - aktivirajte ju u rubrici "Neaktivni upitnici"');
            setTimeout(() => {
                navigate('/auth/surveys-unactive');
            }, 4000);
            
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
            <div className="bg-white lg:bg-gray-100 mx-0 my-10 px-10 py-14 lg:shadow-lg lg:mx-28 2xl:mx-80">
                <Header title="Kreacija upitnika" subtitle="Opći podatci o upitniku se nalaze ispod" />

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

                    <form className="space-y-10 bg-white px-2 py-2 sm:p-6" onSubmit={onSubmit}>
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
                                            Dodaj
                                        </button>
                                    </div>
                                </div>
                            {/*Image*/}

                            {/* Title and Expire Date */}
                                <div className="flex gap-3 justify-between my-5">

                                    {/* Title */}
                                    <div className="flex-1">
                                        <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                            Naslov 
                                        </label>
                                        <input
                                        required
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={survey.title}
                                        onChange={(e) => {setSurvey({...survey, title: e.target.value})}}
                                        placeholder="Naslov upitnika"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                        />
                                    </div>
                                    {/* Title */}

                                    {/* Exp Date */}
                                    {/* <div>
                                        <label
                                        htmlFor="expire_date"
                                        className="block text-sm font-medium text-gray-700"
                                        >
                                            Datum isteka 
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
                                    </div> */}
                                    {/* Exp Date */}

                                </div>
                            {/* Title and Expire Date */}

                            {/*Description*/}
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                    >
                                        Opis
                                    </label>
                                    
                                    <textarea
                                    name="description"
                                    id="description"
                                    required
                                    value={survey.description}
                                    onChange={(e) => {setSurvey({...survey, description: e.target.value})}}
                                    placeholder="Opiši svoj upitnik"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            {/*Description*/}
                                <hr className='my-10' />

                        {/* QUESTIONS */}
                            <div className="flex justify-between mt-5">
                                <h3 className="text-2xl font-bold">Pitanja</h3>
                                <button type="button"  onClick={() => addQuestion()} title="Dodaj pitanje" className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <PlusIcon className="w-3 text-white"/>
                                </button>
                            </div>

                            {newQuestions.length ?  (
                                newQuestions.map((question, index) => {
                                return  <React.Fragment key={question.id}>
                                    <div className='shadow-lg p-10'>
                                        <div className="flex flex-col lg:flex-row gap-3 justify-between my-5">
                                            <h4> {index + 1}. Pitanje </h4>
                                            <div className="flex items-center">
                                                <button type="button" onClick={() => addQuestion()} title="Dodaj pitanje" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                                                    <PlusIcon className="w-4" />
                                                </button>

                                                <button type="button" onClick={() => deleteQuestion(question)} title="Obriši pitanje" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                                                    <TrashIcon className="w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 justify-between my-5">

                                            {/* Question Text */}
                                                <div className="flex-1">
                                                <label
                                                    htmlFor="question"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Pitanje
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
                                                    className="mt-1 block w-full py-2 rounded-md border border-gray-300 shadow-sm focus:border-grey-500 focus:ring-grey-500 sm:text-sm"
                                                />
                                                </div>
                                            {/* Question Text */}

                                            {/* Question Type */}
                                                <div>
                                                <label
                                                    htmlFor="questionType"
                                                    className="block text-sm font-medium text-gray-700 w-40"
                                                >
                                                    Tip pitanja
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
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-grey-500 focus:outline-none focus:ring-grey-500 sm:text-sm"
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
                                                    Opis pitanja
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

                                                
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-grey-300 focus:ring-grey-300 sm:text-sm"
                                                ></textarea>
                                            </div>
                                        {/* Description */}
                                        
                                        {/* Check question type */}
                                            {
                                            (question.type === 'select' || question.type === 'radio' || question.type === 'checkbox') && (
                                                <div>
                                                <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                                                    Opcije
                                                    <button
                                                    // IMPORTANT
                                                    onClick={() => addOption(question)}
                                                    type="button"
                                                    className="flex items-center text-xs p-2 rounded-md my-3 text-white bg-gray-800 hover:bg-gray-700"
                                                    >
                                                    Dodaj
                                                    </button>
                                                </h4>

                                                {question.data.options.length === 0 && (
                                                    <div className="text-xs text-gray-600 text-center py-3">
                                                        Nemate definiranih opcija
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
                                                                className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-red-500"
                                                                />
                                                                <button
                                                                //BITNO BITNO BITNO
                                                                onClick={() => deleteOption(question, option)}
                                                                type="button"
                                                                className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors  "
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
                                <span className='text-sm font-light leading-relaxed text-gray-600'>Nema dodanih pitanja</span>
                            )}
                        {/* QUESTIONS */}
                        <br />
                        <button type="submit" className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Stvori upitnik</button>
                    </form> 
            </div>
        </>
    )
}
