/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';
import axiosClient from '../../axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import Header from '../../components/Header';


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
    return <Navigate to='/auth/user-profile' />
  }
  
  function activateSurvey(id) {
    if(!window.confirm('Jeste li sigurni da želite aktivirati ovaj upitnik? Ovim činom šaljete obavijest svim korisnicima da je novi upitnik aktivan i spreman za popunjavanje')) {
      return false;
    }
    
    axiosClient.post('activate_survey', { id: id })
      .then(({data}) => {
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
    <div id="unpublished_surveys" className='bg-gray-100 py-16 px-4 min-h-screen'>
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

      <Header title="Neaktivni upitnici" subtitle="Ovdje možete dobiti pristup pojedinom upitniku te ga objaviti ili izmijeniti. Objavom upitnika svi korisnici će dobiti na svoj e-mail obavijest kako je novi upitnik aktivan i spreman za popunjavanje" />

      
      <div className="grid-cols-1 sm:grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 mt-10 mx-10">

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
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200"> Anketa stvorena: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}  </p>
                  
                    <div className='flex justify-center flex-col sm:flex-col md:flex-col  lg:flex-col xl:flex-row px-6 sm:px-6 md:px- lg:px-10 xl:px-10'>
                                
                    <button
                      type="button"
                      className="md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => activateSurvey(survey.id)}
                    >
                      Aktiviraj
                    </button>

                    <Link
                      to={`auth/survey-update/${survey.id}`}
                      onClick={() => navigate(`auth/survey-update/${survey.id}`)}
                      className="mt-5 mb-5 md:mb-5 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <button type="button">Izmijeni</button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteSurvey(survey.id)}
                      className="mb-2 md:mb-0 md:mr-2 lg:my-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Obriši
                    </button>
                  </div>
                  </div>
              </div>
            </React.Fragment>
          })
          
        ) : (
          <span className='text-xl font-light leading-relaxed text-gray-600'>Trenutno nema neaktivnih anketnih upitnika</span>
        )}

      </div>
    </div>
  )
}
