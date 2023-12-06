import { useEffect, useState } from 'react'
import axiosClient from '../../axios'
import { Link, useNavigate } from "react-router-dom";
import UserSvg from '../../components/svgs/UserSvg'
import { motion } from "framer-motion";
import { containerVariant } from "../../components/variants/variants";


export default function ShowUserProfile() {

  const [surveys, setSurveys] = useState([]);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('user-surveys')
    .then(({data}) => {
      setSurveys(data);
    })
    .catch(e => console.log(e))
  }, []);

 
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black left">
        <UserSvg/>
      </div>

      <motion.div 
          className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center overflow-y-auto right" 
          variants={containerVariant}
          initial="hidden"
          animate="show"  >
        <div className="max-w-md w-full p-6 h-full">

          <div className='flex flex-col justify-center items-center mt-12'>
            <h1 className="mb-4 text-4xl font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono ">Vaši upitnici</h1>
            <p className="mb-6 mt-2 text-xl font-light leading-relaxed text-gray-600 lg:text-md sm:px-16">Pregled ispunjenih upitnika</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 py-">
            {surveys.length ? (
              surveys.map((survey) => {
                const expireDate = new Date(survey.expire_date);
                return (
                  <div key={survey.id}className="w-full mb-4 bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                    <img className="rounded-t-lg h-64 w-full object-cover" src={survey.image} alt="survey_image"/>
                    <hr />
                    <div className="p-6">
                      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {survey.title}
                      </h5>
                      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        {survey.description.split(' ').slice(0, 20).join(' ')}...
                      </p>
                      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Automatsko zaključavanje:{' '}
                        {expireDate.toLocaleDateString(undefined, dateFormatOptions)}
                      </p>
                      <div className="flex justify-center">
                        <Link
                          to={`auth/user-answers-surveys/${survey.id}`}
                          onClick={() => navigate(`auth/user-answers-surveys/${survey.id}`)}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Moji odgovori
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <span className='text-xl font-light leading-relaxed text-gray-600'>Trenutno nema ispunjenih anketnih upitnika</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>

  )
}
