/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import  Navbar  from '../../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/Landing.css'
import { containerVariant, glueVariant } from "../../components/variants/variants";
import axiosClient from '../../axios'
import uuid from 'react-uuid';

export default function Landing() {

    const [userreviewed, setUserreviewed] =  useState(0);
    const [avragegrade, setAvragegrade] = useState(0);
    const [LsCheck, setLsCheck] = useState(JSON.parse(localStorage.getItem('radisaLikes')) || '');
    const [isClicked, setIsClicked] = useState(false);
    const [refresher, setRefresher] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLikesFromServer();
        showStars(LsCheck.grade - 1);
        if(LsCheck !== '') {
            setIsClicked(true);
        }
    }, [refresher]);

    function handleClick(e) {
        const clickedIndex = Array.from(document.querySelectorAll('.star')).indexOf(e.target);

        showStars(clickedIndex);
        setIsClicked(true);

        let userGrade = {
            id: uuid(),
            grade: clickedIndex + 1
        }

        localStorage.setItem('radisaLikes' , JSON.stringify(userGrade));

        //send to server...
        axiosClient.post('save_like' , {
            id:userGrade.id,
            grade:userGrade.grade
        })
        .then(({data}) => {
            toast.success(data);
            setRefresher(!refresher); //to update new grade rusults after click
        })
        .catch(e => console.log(e));
    }

    function showStars(index) {
        const elements = document.querySelectorAll('.star');
        for (let j = 0; j <= index; j++) {
            elements[j].style.color = 'gold';
            }
    }

    function getLikesFromServer() {
        axiosClient.get('get_likes')
        .then(({data}) => {
            setUserreviewed(data.number_of_users);
            setAvragegrade(data.avrage_grade.toFixed(1));
            setLoading(false);
        })
        .catch(e => console.log(e));
    }

    return <>
        <section id="landing" className="data h-screen relative overflow-hidden" >
            <Navbar />    

            <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="show"   
                className="hero-gradient absolute top-[10%] right-[0%] " 
            />

            <div className="flex items-center justify-center h-[75vh] mt-10 md:mt-0">
                <div className="basis-1/2 ml-20 ">
                    <motion.h1
                        variants={containerVariant}
                        initial="hidden"
                        animate="show"
                        className="text-2xl uppercase font-mono font-extrabold text-white hidden lg:block"

                    >
                        UDHR
                    </motion.h1>

                    <motion.h1
                    variants={containerVariant}
                    initial="hidden"
                    animate="show"
                    className="text-4xl py-0 md:text-5xl md:py-3 lg:text-6xl font-extrabold mt-6 text-white w-[90%]"
                    >
                        Učenički dom Hrvatskoga radiše Osijek
                    </motion.h1>

                    <motion.p
                        variants={containerVariant}
                        initial="hidden"
                        animate="show"
                        className="text-l font-bold text-white w-[90%] my-10 lg:text-2xl" 
                    >
                        {/*default - na md screenu - na lg scrennu NPR text-4xl py-0 md:text-5xl md:py-3 lg:text-6xl */}
                        
                        E-radiša je aplikacija za ispitivanja mišljenja i stavova naših učenika, posjeti i koristi ju! Tvoje mišljenje nam je bitno!
                    </motion.p>

                    <Link to='https://www.hrvatski-radisa.hr/' target="_blank">
                        <button className="w-[50%] p-[10px] text-l font-bold bg-white lg:text-2xl lg:w-[30%] lg:p-[20px]">
                            Posjeti naš Dom
                        </button>
                    </Link>

                    <motion.div
                        variants={containerVariant}
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
                        </div>

                        {!loading ? (
                            <span>{userreviewed} KORISNIKA  - {avragegrade} OCJENA </span>  
                        ) : (
                            <span>Loading...</span>
                        )}
                        
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
        </section>
    </>
}
