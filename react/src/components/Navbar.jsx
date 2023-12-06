import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../assets/logo2.png'; 
import { navContainer, navItem, hoverNavVariant, logoVariantHover } from '../components/variants/variants'

function Navbar() {
    
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