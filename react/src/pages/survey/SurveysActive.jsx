/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { UserStateContext } from '../../context/ContextProvaider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { containerVariant } from '../../components/variants/variants';
import { motion } from "framer-motion";
import Header from '../../components/Header';

export default function SurveysActive() {

    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
    const {admin} = UserStateContext();
    const [refresher, setRefresher] = useState(false);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        axiosClient.get('active_surveys')
        .then(({data}) => {
            setSurveys(Object.values(data)); // Convert the object to an array
        })
        .catch(e => console.log(e));
    }, [refresher])


    function deactiveSurvey(id) {
        if(!window.confirm('Jeste li sigurni da želite deaktivirati anketu? Ukoliko da, vratiti će ju na doradu u rubirku "Neaktivni upitnici. Također, ovo će obrisati sve dosadašnje odgovore ove ankete stoga SVI učenici trebaju ponovo popuniti ankentni upitnik!"')) {
            return false;
        }

        axiosClient.get(`deactive_survey/${id}`)
        .then(() => {
            toast.success('Upitnik vraćen na doradu u rubriku "Neaktivni upitnici"');
            setRefresher(!refresher);
        })
        .catch(e => console.log(e));
    }

    function finishSurvey(id) {
        if(!window.confirm('Jeste li sigurni da želite završiti anketu? Ovo je nepovratna radnja, ukoliko završite anketu pregled njenih rezultata možete vidjeti u rubrici "Rezultati"')) {
            return false;
        }

        axiosClient.get(`finish_survey/${id}`)
        .then(() => {
            toast.success('Upitnik uspješno završen, rezultate upitnika pregledajte u rubrici "Rezultati"');
            setRefresher(!refresher);
        })
        .catch(e => console.log(e));
    }

  return (
    <>
    <div id="published_surveys"  className='bg-gray-100 py-16 px-4 min-h-screen'>
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

        <Header title="Aktivni upitnici" subtitle="Ovdje možete dopiti pristup popunjavanju pojedinog upitnika"/>
       

        <div className="grid-cols-1 sm:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 mt-12 mx-10">
            {surveys.length ? 
            (
                surveys.map((survey) => {
                    const expireDate = new Date(survey.expire_date);
                    return  <React.Fragment key={survey.id}>
                        <motion.div  
                            variants={containerVariant}
                            initial="hidden"
                            animate="show"  
                            className="block rounded-lg m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)" >
                            <img
                                className="rounded-t-lg h-64 w-full object-cover"
                                src={survey.image}
                                alt="survey_image" />
                                <hr />
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"> {survey.title} </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> {survey.description.split(' ').slice(0, 20).join(' ')}... </p>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> Anketa stvorena: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}  </p>
                            
                                <div className='flex justify-center flex-col sm:flex-col md:flex-col  lg:flex-col xl:flex-row px-6 sm:px-6 md:px- lg:px-10 xl:px-10'>
                                    {admin ? (
                                        <>
                                            <button
                                            type="button"
                                            className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => deactiveSurvey(survey.id)}
                                            >
                                            Deaktiviraj
                                            </button>

                                            <button
                                            type="button"
                                            className="mb-2 md:my-4 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => finishSurvey(survey.id)}
                                            >
                                            Završi
                                            </button>

                                            <button
                                            type="button"
                                            disabled
                                            className="mb-2 md:my-4 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                            {survey.user_count}/136
                                            </button>
                                        </>
                                        ) : (
                                        <Link
                                            to={`auth/survey/${survey.id}`}
                                            onClick={() => navigate(`auth/survey/${survey.id}`)}
                                            className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Ispuni
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </React.Fragment>  
                })
            ) : (
                <span className='text-xl font-light leading-relaxed text-gray-600'>Trenutno nema aktivnih anketnih upitnika</span>
            )}

        </div>
    </div>
    </>
  )
}
