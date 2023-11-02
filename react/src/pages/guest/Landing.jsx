/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import  Navbar  from '../../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/Landing.css'


export default function Landing() {

   if(localStorage.getItem('all') === null) {
       const data = {
           users:0,
           gradeSum: 0,
           avrageGrade: 0
         };
         
       const jsonString = JSON.stringify(data);
       localStorage.setItem("all", jsonString);
   } 

   const [userreviewed, setUserreviewed] =  React.useState(JSON.parse(localStorage.getItem('all')).users);
   const [avragegrade, setAvragegrade] = React.useState(JSON.parse(localStorage.getItem('all')).avrageGrade);
   const [isClicked, setIsClicked] = React.useState(false);

   React.useEffect(() => {
       const elements = document.querySelectorAll('.star');
   
       const handleClick = (event) => {
         for (let j = 0; j <= event.target.index; j++) {
           elements[j].style.color = 'gold';
         }
         addGrade(event.target.index + 1);
        
   
         event.target.removeEventListener('click', handleClick);
       };
   
       elements.forEach((element, index) => {
         element.index = index; 
         element.addEventListener('click', handleClick);
       });

   
       return () => {
         elements.forEach((element) => {
           element.removeEventListener('click', handleClick);
         });
       };
     }, [avragegrade, userreviewed]);

   
   function handleClick() {
       setIsClicked(true);
       toast("Hvala na ocjeni!");
   }



   function addGrade(userGrade) {
       const storedDataString = localStorage.getItem('all');
       const storedData = JSON.parse(storedDataString);

       //USERS
       let oldUserSum = storedData.users
       let userSum = Number(oldUserSum) + 1;
       setUserreviewed(userSum);

       //GRADE
       let oldGrade = storedData.gradeSum
       let gradeSum = Number(oldGrade) + Number(userGrade);

       //AVRAGE
       let avrage = Number(gradeSum) / Number(userSum);
       let fixedAvrage = avrage.toFixed(1);
       setAvragegrade(fixedAvrage); 

       //SAVE TO LSTORE
       storedData.users = userSum; 
       storedData.gradeSum = gradeSum; 
       storedData.avrageGrade = fixedAvrage; 

       localStorage.setItem('all', JSON.stringify(storedData));
   }

   
   //ANIMACIJE
    const titleAndContainerVariant = {
        hidden: {
            y: 350,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring", 
                delay: .8 , 
                damping: 20,
                stiffness: 100,
            },
        }
    }

    const glueVariant = {
        hidden: {
            opacity: 0,
        }, 

        show: {
            opacity: 1,
            transition: {
                type: "tween", 
                delay: 1.8 , 
            },

        }
    }

   return <>
       <section id="landing" className="data h-[110vh] relative  overflow-hidden" >
           <Navbar />    

           <motion.div
               variants={titleAndContainerVariant}
               initial="hidden"
               animate="show"   
               className="hero-gradient absolute top-[10%] right-[0%] " 
           />

           <div className="flex items-center justify-center h-[75vh] ">
               <div className="basis-1/2 ml-20">
                   <motion.h1
                       variants={titleAndContainerVariant}
                       initial="hidden"
                       animate="show"
                       className="text-2xl uppercase font-mono font-extrabold text-white "
                   >
                       UDHR
                   </motion.h1>

                   <motion.h1
                       variants={titleAndContainerVariant}
                       initial="hidden"
                       animate="show"
                       className="text-6xl font-extrabold mt-6 text-white w-[90%] py-3"
                   >
                       Učenički dom Hrvatskoga radiše Osijek
                   </motion.h1>

                   <motion.p
                       variants={titleAndContainerVariant}
                       initial="hidden"
                       animate="show"
                       className="text-2xl font-bold text-white w-[90%] my-10"
                   >
                     
                       E-radiša je aplikacija za ispitivanja mišljenja i stavova naših učenika, posjeti i koristi ju! Tvoje mišljenje nam je bitno!
                   </motion.p>

                   <Link to='https://www.hrvatski-radisa.hr/' target="_blank">
                       <button className="text-2xl font-bold text-swhite w-[30%] p-[20px] bg-white">
                           Posjeti naš Dom
                       </button>
                  </Link>

                   <motion.div
                       variants={titleAndContainerVariant}
                       initial="hidden"
                       animate="show"
                       className="text-1xl font-bold text-white w-[90%] my-10"
                   >
                      Ocjeni aplikaciju: 
                      <div>
                       <i className={`star cursor-pointer ${isClicked ? 'unclickable' : ''}`} onClick={handleClick}></i> 
                       <i className={`star cursor-pointer ${isClicked ? 'unclickable' : ''}`} onClick={handleClick}></i> 
                       <i className={`star cursor-pointer ${isClicked ? 'unclickable' : ''}`} onClick={handleClick}></i> 
                       <i className={`star cursor-pointer ${isClicked ? 'unclickable' : ''}`} onClick={handleClick}></i> 
                       <i className={`star cursor-pointer ${isClicked ? 'unclickable' : ''}`} onClick={handleClick}></i> 
                       <br />
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
                      </div>
                     
                     <span>{userreviewed} KORISNIKA  - {avragegrade}  OCJENA   </span>  
                   </motion.div>
               </div>

               <div className="basis-1/2 ">
                   <motion.div 
                       className="circle"
                       variants={glueVariant}
                       initial="hidden"
                       animate="show"
                   />
               </div>
           </div> 
       </section>
   </>
}
