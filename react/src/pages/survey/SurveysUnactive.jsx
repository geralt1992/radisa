/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';
import axiosClient from '../../axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

export default function SurveysUnpublished() {

  const navigate = useNavigate();
  const { admin } = UserStateContext();
  const [surveys, setSurveys] = useState([]);
  const [refresher, setRefresher] = useState(true);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

 
  
  useEffect(() => {
    axiosClient.get('unactive_surveys')
      .then(({ data }) => {
        setSurveys(data);
      })
  }, [refresher]); 


  // Redirect user from this page if isn't admin
  if (!admin) {
    return <Navigate to='/auth/dashboard' />
  }
  
  function activateSurvey(id) {
    if(!window.confirm('Jeste li sigurni da želite aktivirati ovaj upitnik? Ovim činom šaljete obavijest svim korisnicima da je novi upitnik aktivan i spreman za popunjavanje')) {
      return false;
    }
    
    axiosClient.post('activate_survey', { id: id })
      .then(() => {
        setRefresher(!refresher);
        toast.success('Uspješno aktivirana anketa!');
      })
      .catch(e => console.log(e));
  }


  function deleteSurvey(id) {
    if(!window.confirm('Jeste li sigurni da želite obrisati ovaj upitnik?')) {
      return false;
    }

    axiosClient.get(`delete_survey/${id}`)
    .then(() => {
      setRefresher(!refresher);
      toast.success('Uspješno obrisana anketa!');
    })
    .catch(e => console.log(e));
  }

 
  return (
    <div id="unpublished_surveys">
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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Neaktivni upitnici</h1>
        <p className="mb-6 mt-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Ovdje možete dobiti pristup pojedinom upitniku te ga objaviti ili izmijeniti. Objavom upitnika svi korisnici će dobiti na svoj e-mail obavijest kako je novi upitnik aktivan i spreman za popunjavanje.</p>
      </div>
      
      <div className="grid-cols-1 sm:grid md:grid-cols-4 mt-12 mx-10">

        {surveys.length ? (
          surveys.map((survey) => {
            const expireDate = new Date(survey.expire_date);

            return  <React.Fragment key={survey.id}>
              <div className="block rounded-lg m-2 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-800" >
                  <img
                    className="rounded-t-lg"
                    src={survey.image}
                    alt="survey_image" />
                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"> {survey.title} </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> {survey.description.split(' ').slice(0, 20).join(' ')}... </p>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> Automatsko zaključavanje: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}  </p>
                  
                    <div className='flex flex-col md:flex-row items-center'>
                    <button
                      type="button"
                      className="mb-2 md:mb-0 md:mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => activateSurvey(survey.id)}
                    >
                      Aktiviraj
                    </button>

                    <Link
                      to={`auth/survey-update/${survey.id}`}
                      onClick={() => navigate(`auth/survey-update/${survey.id}`)}
                      className='mb-2 md:mb-0 md:mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <button type="button">Izmijeni</button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteSurvey(survey.id)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Obriši
                    </button>
                  </div>
                  </div>
              </div>
            </React.Fragment>
          })
          
        ) : (
          <h1>Trenutno nema neaktivnih anketnih upitnika</h1>
        )}

      </div>
    </div>
  )
}
