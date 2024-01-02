/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../axios';

export default function ShowAnswearsOfSurveys() {

  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [questionsAndAnswers, setquestionsAndAnswers] = useState([]);
  const expireDate = new Date(survey.expire_date);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    axiosClient.get(`user-survey-answear/${id}`)
    .then(({data}) => {
      setquestionsAndAnswers(data.questionsAndAnswers);
      setSurvey(data.survey);
    })
    .catch(e => console.log(e));
  }, [])

  return (
    <div className='px-2 py-20 2xl:px-60'> 
      <form className=" mx-2 lg:mx-auto md:text-start text-center">
        <div className="grid grid-cols-6">
          <div className="mr-4">
            <img src={survey.image} alt="survey_profile_image" className='hidden 2xl:block' />
          </div>

          <div className="col-span-5 ml-[-4rem] md:ml-0">
            <h1 className="text-4xl mb-3 font-bold tracking-wide text-gray-600 font-mono ">{survey.title}</h1>
            <p className="text-gray-500 text-sm mb-3">
              Upitnik istječe: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}
            </p>
            <p className="text-sm mb-6 mt-2 font-light leading-relaxed text-gray-600 hidden md:block lg:text-md">{survey.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, recusandae explicabo error porro voluptate sequi consectetur possimus ipsum adipisci corporis facere cumque doloremque iste corrupti illo a perferendis! Voluptatem eveniet doloribus repudiandae nulla odit. Expedita numquam amet temporibus doloremque dolorum exercitationem error aperiam dignissimos aliquam, rem nobis nemo laudantium quaerat aut. Exercitationem ut eum sit laborum, voluptatibus adipisci est quo. Saepe, voluptas adipisci? Dicta ratione a laboriosam et impedit, delectus sit quas fuga eos commodi corporis quae laudantium repudiandae eius explicabo nesciunt aspernatur dolorem molestiae! Dolorum harum reprehenderit sit, hic fuga eligendi, velit natus maiores quidem accusamus obcaecati repudiandae ratione.</p>
          </div>
        </div>

        <button type="submit" disabled className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Moji odgovori
        </button>

        <hr className="mt-8" />

        <h1 className="my-3 text-2xl mb-3 font-bold tracking-wide text-gray-600 font-mono">Pitanja</h1>
        {questionsAndAnswers.map((question, index) => (

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
                      disabled
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={question.answear}>{question.answear}</option>
                    </select>
                  </div>
                )}

                {question.type === "radio" && (
                  <div>
                    <div className="flex items-center">
                      <input
                        required
                        checked
                        disabled
                        value={question.answear}
                        id={question.id}
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={question.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                          {question.answear}
                      </label>
                    </div>
                  </div>
                )}

                {question.type === "checkbox" && (
                  <div>
                    {JSON.parse(question.answear).map((answera, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          checked
                          disabled
                          id={index}
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={index}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {answera}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <div>
                    <input
                      disabled
                      type="text"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={question.answear}
                    />
                  </div>
                )}
              </div>
            </fieldset>
            <hr className="mb-4" />
          </React.Fragment>
        ))}
      </form>
    </div>
  )
}
