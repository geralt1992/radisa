import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function OneSurvey() {

  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const expireDate = new Date(survey.expire_date);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const answers = {};
  const navigate = useNavigate();


  useEffect(() => {
    axiosClient.get(`get_choosen_survey/${id}`)
      .then(({ data }) => {
        setSurvey(data.survey);
        setQuestions(data.questions);
      })
      .catch(e => console.log(e));
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    if (!window.confirm('Želite li predati anketni upitnik?')) { return false }

    // Check if there is at least one checkbox selected for each checkbox question
    const checkboxQuestions = questions.filter((question) => question.type === "checkbox");
    const isAtLeastOneCheckboxSelected = checkboxQuestions.every((question) => {
      return answers[question.id] && answers[question.id].length > 0;
    });

    if (!isAtLeastOneCheckboxSelected) {
      toast.error('Molimo vas da odaberete barem jedan odgovor za pitanja koja koriste opcije.');
      return false;
    }

    axiosClient.post('save_survey_answear', {
      surveyId: id,
      answers: answers
    })
    .then(() => {
      setIsFinished(true);
      toast.success('Zahvaljujemo na sudjelovanju, upitnik uspješno popunjen!');
      setTimeout(() => {
        navigate('/auth/surveys-active');
      }, 3000);
    })
    .catch((error) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        finalErrors.forEach((e) => toast.error(e))
      }
      console.log(error);
    });
  }

  function answerChanged(question, e) {
    answers[question.id] = e;
  }
  
  function onCheckboxChange(option, e, question) {
    if (e.target.checked) {
      answers[question.id] = answers[question.id] || [];
      answers[question.id].push(option);
    } else {
      answers[question.id] = answers[question.id].filter((op) => op !== option);
    }
  
    answerChanged(question, answers[question.id]);
  }


  return (

    <div className='px-2 py-20 2xl:px-60'> 
      <form onSubmit={onSubmit} className=" mx-2 lg:mx-auto md:text-start text-center">
        
        <div className="grid grid-cols-6">
          <div className="mr-4">
            <img src={survey.image} alt="survey_profile_image" className='hidden 2xl:block' />
          </div>

          <div className="col-span-5 ml-[-4rem] md:ml-0">
            <h1 className="text-4xl mb-3 font-bold tracking-wide text-gray-600 font-mono ">{survey.title}</h1>
            <p className="text-gray-500 text-sm mb-3">
              Anketa stvorena: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}
            </p>
            <p className="text-sm mb-6 mt-2 font-light leading-relaxed text-gray-600 hidden md:block lg:text-md">{survey.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, recusandae explicabo error porro voluptate sequi consectetur possimus ipsum adipisci corporis facere cumque doloremque iste corrupti illo a perferendis! Voluptatem eveniet doloribus repudiandae nulla odit. Expedita numquam amet temporibus doloremque dolorum exercitationem error aperiam dignissimos aliquam, rem nobis nemo laudantium quaerat aut. Exercitationem ut eum sit laborum, voluptatibus adipisci est quo. Saepe, voluptas adipisci? Dicta ratione a laboriosam et impedit, delectus sit quas fuga eos commodi corporis quae laudantium repudiandae eius explicabo nesciunt aspernatur dolorem molestiae! Dolorum harum reprehenderit sit, hic fuga eligendi, velit natus maiores quidem accusamus obcaecati repudiandae ratione.</p>
          </div>
        </div>

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {!isFinished && (

          <>
            <div>
              <h1 className="my-3 text-2xl mb-3 font-bold tracking-wide text-gray-600 font-mono">Pitanja</h1>
              {questions.map((question, index) => (

                <React.Fragment key={index}>
                  <fieldset className="mb-4">

                    {/* ONE QUESTION */}
                    <div>
                      <legend className="text-base font-medium text-gray-900">
                        {index + 1}. {question.question}
                      </legend>
                      <p className="text-gray-500 text-sm">{question.description}</p>
                    </div>

                    <div className="mt-3">

                      {question.type === "select" && (
                        <div>
                          <select
                            required
                            onChange={(e) => answerChanged(question, e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">Please Select</option>
                            {JSON.parse(question.options).map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {question.type === "radio" && (
                        <div>
                          {JSON.parse(question.options).map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                required
                                id={index}
                                name={"question" + question.id}
                                value={option}
                                onChange={(ev) => answerChanged(question, ev.target.value)}
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor={index}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "checkbox" && (
                        <div>
                          {JSON.parse(question.options).map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                id={index}
                                onChange={e => onCheckboxChange(option, e, question)}
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                              <label
                                htmlFor={index}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "text" && (
                        <div>
                          <input
                            required
                            type="text"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => answerChanged(question, e.target.value)}
                          />
                        </div>
                      )}

                    </div>
                  </fieldset>
                  <hr className="mb-4" />
                </React.Fragment>
              ))}
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Predaj upitnik
            </button>
          </>

        )}
      </form>
    </div>

  )
}
