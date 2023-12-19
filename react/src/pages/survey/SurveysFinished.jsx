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

    <div className="grid-cols-1 sm:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 mt-12 mx-10">
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
