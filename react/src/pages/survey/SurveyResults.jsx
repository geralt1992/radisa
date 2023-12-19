/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../axios';
import { Navigate, useParams } from 'react-router-dom';
import { UserStateContext } from '../../context/ContextProvaider';
import ChartComponent from '../../components/Chart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function SurveyResults() {
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [results, setResults] = useState([]);
  const expireDate = new Date(survey.expire_date);
  const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const { admin } = UserStateContext();
  const [exportingPDF, setExportingPDF] = useState(false); //kad se klikne postane "true"  i onda se input height poveća da bi bio vidljiv pdfu
  const resultsRef = useRef(null);

  useEffect(() => {
    axiosClient
      .get(`survey_results/${id}`)
      .then(({ data }) => {
        setSurvey(data.survey);
        setResultsOfSurvey(data.answears);
      })
      .catch((e) => console.log(e));
  }, []);


  // CHAT GPT
  function setResultsOfSurvey(answears) {

    const groupedAnswers = {};

    answears.forEach(response => {
        const question = response.question;
        const answer = response.answear;
        const type = response.type;

        if (!groupedAnswers.hasOwnProperty(question)) {
            groupedAnswers[question] = { type: type, answers: {} };
        }

        if (response.type === 'checkbox') {
            const selectedOptions = JSON.parse(answer || '[]');

            selectedOptions.forEach(selectedOption => {
                if (groupedAnswers[question].answers.hasOwnProperty(selectedOption)) {
                    groupedAnswers[question].answers[selectedOption]++;
                } else {
                    groupedAnswers[question].answers[selectedOption] = 1;
                }
            });
        } else {
            if (groupedAnswers[question].answers.hasOwnProperty(answer)) {
                groupedAnswers[question].answers[answer]++;
            } else {
                groupedAnswers[question].answers[answer] = 1;
            }
        }
    });

    const percentageData = {};

    for (const question in groupedAnswers) {
        if (groupedAnswers.hasOwnProperty(question)) {
            const totalResponses = Object.values(groupedAnswers[question].answers).reduce((total, count) => total + count, 0);

            percentageData[question] = [];

            for (const answer in groupedAnswers[question].answers) {
                if (groupedAnswers[question].answers.hasOwnProperty(answer)) {
                    const count = groupedAnswers[question].answers[answer];
                    const percentage = (count / totalResponses) * 100;

                    const roundedPercentage = Math.round(percentage * 100) / 100;

                    percentageData[question].push({
                        answer: answer,
                        count: count,
                        percentage: roundedPercentage,
                        type: groupedAnswers[question].type 
                    });
                }
            }
        }
    }
    setResults(percentageData);
  }


  // CHAT GPT
  const exportAsPDF = async () => {
    try {
      const resultsElement = resultsRef.current; //drži cijeli form element
      const html2canvasOptions = {
        dpi: 300,
        scale: 1,
        width: 800, 
        height: 1200, 
        letterRendering: true,
      };
   
      const pdf = new jsPDF();
  
      const addPageToPDF = async (content) => {
        const canvas = await html2canvas(content, html2canvasOptions);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      };
  
        // Split your content into sections EACH QUESTION
        const sections = Array.from(resultsElement.children);
        for (let i = 0; i < sections.length; i++) {
          if (i >= 4) {   
            pdf.addPage();
            await addPageToPDF(sections[i]);
          } 
        }
  
      pdf.save('survey_results.pdf');
      setExportingPDF(false);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Check console for details.');
    }
  };
  


  if (!admin) {
    return <Navigate to="auth/user-profile" />;
  }
 

  return (
    <div className='px-60 py-20'>
      <form className="container mx-auto p-4" ref={resultsRef}>

      <div className="grid grid-cols-6">
        <div className="mr-4">
          <img src={survey.image} alt="survey_profile_image" /> 
        </div>

        <div className="col-span-5">
          <h1 className="text-4xl mb-3 font-bold tracking-wide text-gray-600 font-mono ">{survey.title}</h1>
          <p className="text-gray-500 text-sm mb-3">
            Anketa stvorena: {expireDate.toLocaleDateString(undefined, dateFormatOptions)}
          </p>
          <p className=" text-sm mb-6 mt-2 font-light leading-relaxed text-gray-600 lg:text-md">{survey.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, recusandae explicabo error porro voluptate sequi consectetur possimus ipsum adipisci corporis facere cumque doloremque iste corrupti illo a perferendis! Voluptatem eveniet doloribus repudiandae nulla odit. Expedita numquam amet temporibus doloremque dolorum exercitationem error aperiam dignissimos aliquam, rem nobis nemo laudantium quaerat aut. Exercitationem ut eum sit laborum, voluptatibus adipisci est quo. Saepe, voluptas adipisci? Dicta ratione a laboriosam et impedit, delectus sit quas fuga eos commodi corporis quae laudantium repudiandae eius explicabo nesciunt aspernatur dolorem molestiae! Dolorum harum reprehenderit sit, hic fuga eligendi, velit natus maiores quidem accusamus obcaecati repudiandae ratione.</p>
        </div>
      </div> 


      {/* CHAT GPT */}
        <button
          type="button"
          onClick={() => {
            setExportingPDF(true);
            exportAsPDF();
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Spremi kao PDF 
        </button> 
      {/* CHAT GPT */}  

      <hr className="mt-8" /> 
  
      {exportingPDF? (
        <p className="my-3 text-xl mb-3 font-bold tracking-wide text-red-600 font-mono">Akcija može potrajati nekoliko minuta, molim za strpljenje, PDF datoteka se stvara...</p>
      ) : (
        <p className="my-3 text-xl mb-3 font-bold tracking-wide text-gray-600 font-mono">Broj korisnika koji su ispunili anketni upitnik: {survey.user_count}</p>
      )
      }
      
      {Object.keys(results).length > 0 ? (
        Object.keys(results).map((question, index) => {
          return (
            <fieldset className="my-8" key={index}>
              <div>
                <legend className="text-base font-medium text-gray-900">
                  {index + 1}. {question}
                </legend>
              </div>

              <div style={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%', maxHeight: '350px', marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                <ChartComponent results={results[question]} />  
              </div>   
            
              {results[question].map((result, resultIndex) => (
                <React.Fragment key={resultIndex}>
                    <input
                      disabled
                      type="text"
                      className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full ${
                        exportingPDF ? 'h-12' : 'h-8'  
                      } shadow-sm sm:text-sm border-gray-300 rounded-md`}
                      value={`${result.answer} - ${result.percentage}% (${result.count})`}
                    />
                </React.Fragment>
              ))}
            
            </fieldset>
          );
        }) 
      ) : (
        <p>Nema rezultata</p>
      )}

      </form>
    </div>
  )
}
