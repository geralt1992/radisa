import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../assets/logo2.png'; 


function Navbar() {
    
//ANIMACIJE
    const navContainer = {
        hidden: { 
            opacity: 0
        },
        show: {
        opacity: 1,
        transition: {
            staggerChildren: .4,
            delay: .1,
            duration: .1
        }
        }
    }
    
    const navItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

    const hoverNavVariant = {
        hidden: {
            y:0,
        },
        show: {
            y:-5,
            fontWeight: 900,
            transition:{ type: "spring", stiffness: 1900 },
            duration: 0.3,
        }
    }

    const logoVariantHover = {
        hidden: {
            scale: 1,
        },
        show: {
            scale: 1.2,
            transition:{ type: "spring",     
            damping: 5,
            stiffness: 500,
            }
        
        },
    }

    return <>
        <nav className="h-[10vh] flex justify-between items-center navbar">
            <div className="ml-[4.2%] mt-5">
                <motion.img 
                    src={logo} 
                    alt="Učenički dom Hrvatskoga radiše Osijek"
                    className="h-[30%] w-[30%] rounded-full cursor-pointer " 
                    whileHover={logoVariantHover.show}
                    onClick={() => {localStorage.clear()}}
                />
            </div>
            <div className="mr-[5%] ">
                <motion.ul 
                    className="list-none  text-white flex cursor-pointer font-mono text-2xl"
                    variants={navContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.li className="mr-16"
                        variants={navItem}
                        whileHover={hoverNavVariant.show}
                    >
                        <Link to='/login'><span >Prijava</span> </Link>
                    </motion.li>

                    <motion.li className="mr-16"
                        variants={navItem}
                        whileHover={hoverNavVariant.show}
                    >   
                         <Link to='/singup'><span >Registracija</span> </Link>
                    </motion.li>
                  
                </motion.ul>
            </div>
        </nav>
    </>
}

export default Navbar;