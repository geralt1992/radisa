/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';
import axiosClient from '../../axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function SurveysFinished() {

const navigate = useNavigate();
const { admin } = UserStateContext();
const [surveys, setSurveys] = useState({});
const [refresher, setRefresher] = useState(true);

useEffect(() => {
    axiosClient.get('finished_surveys')
    .then(({data}) => {
        setSurveys(data);
    })
    .catch(e => console.log(e));
}, []);

if(!admin) {
    return <Navigate to='/auth/dashboard'/>
}

function deleteSurvey(id) {
    axiosClient.get(`delete_survey/${id}`)
    .then(() => {
      setRefresher(!refresher);
      toast.success('Uspješno obrisana anketa!');
    })
    .catch(e => console.log(e));
}

function showResult($id) {

}

  return (
    <div id="finished_surveys">

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
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Završene ankete</h1>
    </div>
    
    <div className="grid-cols-1 sm:grid md:grid-cols-4 mt-12 mx-10">

      {surveys.length ? (
        surveys.map((survey) => {
          return  <React.Fragment key={survey.id}>
            <div className="block rounded-lg m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" >
                <img
                  className="rounded-t-lg"
                  src={survey.image}
                  alt="survey_image" />
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"> {survey.title} </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> {survey.description.split(' ').slice(0, 40).join(' ')}... </p>
                
                <div className='flex justify-center'>

                  <Link
                      to={`auth/survey/${survey.id}`}
                      onClick={() => navigate(`auth/survey/${survey.id}`)}
                  >
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                   >
                    Rezultati
                  </button>
                  </Link>

                </div>
                </div>
            </div>
          </React.Fragment>
        })
        
      ) : (
        <h1>Trenutno nema završenih anektnih upitnika</h1>
      )}

    </div>
  </div>
    
  )
}
