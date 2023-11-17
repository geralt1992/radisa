/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { UserStateContext } from '../../context/ContextProvaider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

export default function SurveysActive() {

    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
    const {admin} = UserStateContext();
    const [refresher, setRefresher] = useState(false);
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        axiosClient.get('active_surveys')
        .then(({data}) => {
            setSurveys(data);
        })
        .catch(e => console.log(e));
    }, [refresher])


    function deactiveSurvey(id) {
        if(!window.confirm('Jeste li sigurni da želite deaktivirati anketu? Ukoliko da, vratiti će ju na doradu u rubirku "Neaktivni upitnici"')) {
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
    <div id="published_surveys">
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
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Aktivni upitnici</h1>
            <p className="mb-6 mt-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ovdje možete dopiti pristup popunjavanju pojedinog upitnika ili ukoliko želite doraditi pojedini upitnik možete ga deaktivirati te ga u rubirici Neaktivni upitnici doraditi.</p>
        </div>

        <div className="grid-cols-1 sm:grid md:grid-cols-4 mt-12 mx-10">
            {surveys.length ? 
            (
                surveys.map((survey) => {
                    const expireDate = new Date(survey.expire_date);
                    return  <React.Fragment key={survey.id}>
                        <div className="block rounded-lg m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" >
                            <img
                                className="rounded-t-lg"
                                src={survey.image}
                                alt="survey_image" />
                            <div className="p-6">
                                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"> {survey.title} </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> {survey.description.split(' ').slice(0, 20).join(' ')}... </p>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> Automatsko zaključavanje: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}  </p>
                            
                            <div className='flex justify-center'>

                                {admin &&
                                    <>
                                        <button
                                        type="button"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        onClick={() => deactiveSurvey(survey.id)}
                                        >
                                            Deaktiviraj
                                        </button>

                                        <button
                                        type="button"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        onClick={() => finishSurvey(survey.id)}
                                        >
                                            Završi 
                                        </button>
                                    </>
                                }


                                <Link
                                    to={`auth/survey/${survey.id}`}
                                    onClick={() => navigate(`auth/survey/${survey.id}`)}
                                >
                                    <button
                                    type="button"
                                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Ispuni
                                    </button>
                                </Link>

                            

                                </div>
                            </div>
                        </div>
                    </React.Fragment>  
                })
            ) : (
                <h1>Trenutno nema aktivnih anketnih upitnika</h1>
            )}
        </div>
    </div>
    
    </>
    
  )
}
