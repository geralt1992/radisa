/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';
import axiosClient from '../../axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import Header from '../../components/Header';

export default function SurveysFinished() {

const navigate = useNavigate();
const { admin } = UserStateContext();
const [surveys, setSurveys] = useState({});

useEffect(() => {
    axiosClient.get('finished_surveys')
    .then(({data}) => {
        setSurveys(data);
    })
    .catch(e => console.log(e));
}, []);

if(!admin) {
    return <Navigate to='/auth/user-profile'/>
}

function yearFilter(e) {
    axiosClient.post('year_filter_done_surveys', {
        year:e.target.value
    })
    .then(({data}) => {
        setSurveys(data);
    })
    .catch(e => console.log(e));
}


return (
<div id="finished_surveys" className='bg-gray-100 py-16 px-4 min-h-screen'>
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

    <Header title="Završeni upitnici" subtitle="Ovdje možete dopiti pristup rezultatima pojedinog upitnika" />

    <div className="flex justify-center items-center">
        <div className="relative h-10 w-72 min-w-[200px] ">
            <select onChange={(e) => yearFilter(e)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value='' defaultValue>Odaberi godinu</option>
                <option value="2024">2024.</option>
                <option value="2025">2025.</option>
                <option value="2026">2026.</option>
                <option value="2027">2027.</option>
            </select>
        </div>

        <button type="button" className="p-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true"fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </button>
    </div>


    <div className="grid-cols-1 sm:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 mt-16 mx-10">
        {surveys.length ? 
        (
            surveys.map((survey) => {
                return  <React.Fragment key={survey.id}>
                    <div className="block rounded-lg m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)" >
                        <img
                            className="rounded-t-lg h-64 w-full object-cover"
                            src={survey.image}
                            alt="survey_image" />
                            <hr />
                        <div className="p-6">
                            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"> {survey.title} </h5>
                            <p className="mb-4 text-base text-neutral-600"> {survey.description.split(' ').slice(0, 20).join(' ')}... </p>
                        
                            <div className='flex justify-center flex-col sm:flex-col md:flex-col  lg:flex-col xl:flex-row px-6 sm:px-6 md:px- lg:px-10 xl:px-10'>

                                <Link
                                    to={`auth/survey-results/${survey.id}`}
                                    onClick={() => navigate(`auth/survey-results/${survey.id}`)}
                                    className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Rezultati
                                </Link>
                            </div>
                        </div>
                    </div>
                </React.Fragment>  
            })
        ) : (
            <span className='text-xl font-light leading-relaxed text-gray-600'>Trenutno nema rezultata</span>
        )}

    </div>
</div>

)
}
