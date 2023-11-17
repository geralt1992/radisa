import { UserStateContext } from '../context/ContextProvaider';
import React from "react";
import logo from '../../src/assets/logo2.png'
import { Link } from 'react-router-dom';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  ChatBubbleLeftIcon,
  KeyIcon,
  Cog6ToothIcon,
  PowerIcon,
  PencilSquareIcon,
  UserCircleIcon
  
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
 

export default function Sidebar() {

    const { setToken, setUser, setAdmin, admin, user } = UserStateContext();
    const [open, setOpen] = React.useState(0);
 
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };

    function logout(e) {
        e.preventDefault();
        setToken(null);
        setUser({});
        setAdmin(false);
      }

  return (
    <Card className="min-h-full w-full max-w-[20rem] p-4 shadow-xl bg-gray-800 text-white shadow-blue-gray-900/5 rounded-none flex-1">
        <div className="mb-2 flex items-center gap-4 p-4">
            <Link to='dashboard'>
            <img src={logo} alt="brand" className="h-12 w-12 rounded-3xl " />
            </Link>
            <Typography variant="h5" color="blue-gray">
                E radiša
            </Typography>
        </div>
        
        <List>
            <Accordion
            open={open === 1}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
            }
            >
                <ListItem className="p-0" selected={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                        <ListItemPrefix> <Cog6ToothIcon className="h-5 w-5" /> </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal  ml-5"> 
                            Upravljačka ploča 
                        </Typography>
                    </AccordionHeader>
                </ListItem>

                <AccordionBody className="py-1">
                    <List className="p-0">

                        {/* USER PROFILE */}
                        <ListItem className="text-white"> 
                            <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                            Moje Profil
                        </ListItem>

                        {/* USER SURVEYS */}
                        <ListItem className="text-white">
                            <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                            Moji upitnici
                        </ListItem>
                    </List>
                </AccordionBody>
            </Accordion>


            {/* //ADMIN PANEL */}
            {admin && (
                <Accordion
                open={open === 2}
                icon={
                    <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                    />
                }
                >
                    <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                <ListItemPrefix> <KeyIcon className="h-5 w-5 " /> </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal  ml-5">
                                    Admin
                                </Typography>
                            </AccordionHeader>
                    </ListItem>

                    <AccordionBody className="py-1">
                        <List className="p-0">

                            {/* CREATE SURVEY */}
                            <Link to='/auth/create'>
                                <ListItem className="text-white">
                                    <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                    Stvori upitnik
                                </ListItem>
                            </Link>

                            {/* UNPUBLISHED SURVEYS */}
                            <Link to='/auth/surveys-unactive'>
                                <ListItem className="text-white">
                                    <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                    Neaktivni upitnici
                                </ListItem>
                            </Link>

                            {/* ACTIVE SURVEYS */}
                            <Link to='/auth/surveys-active'>
                                <ListItem className="text-white">
                                    <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                    Aktivni upitnici
                                </ListItem>
                            </Link>

                            {/* DONE SURVEYS */}
                            <Link to='/auth/surveys-finished'>
                                <ListItem className="text-white">
                                    <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                    Rezultati
                                </ListItem>
                            </Link>

                            {/* STUDENTS ADVICES */}
                            <ListItem className="text-white">
                                <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                Pregled prijedloga
                            </ListItem>

                            {/* ADD STUDENTS */}
                            <ListItem className="text-white">
                                <ListItemPrefix> <ChevronRightIcon strokeWidth={3} className="h-3 w-5" /> </ListItemPrefix>
                                Dodaj učenika
                            </ListItem>

                        </List>
                    </AccordionBody>
                </Accordion>
            )}
            {/* //ADMIN PANEL */}

            <hr className="my-2 border-blue-gray-50" />
            
            {/* ACTIVE SURVEYS */}
            <Link to='/auth/surveys-active'>
                <ListItem>
                    <ListItemPrefix> <PencilSquareIcon className="h-5 w-5 mr-5" /> </ListItemPrefix>
                    Aktivni upitnici
                </ListItem>
            </Link>
            
            {/* ADD ADVICE */}
            <Link to='/auth/surveys'>
                <ListItem >
                    <ListItemPrefix> <ChatBubbleLeftIcon className="h-5 w-5 mr-5" /> </ListItemPrefix>
                    Prijedlozi
                </ListItem>  
            </Link>
            
            {/* LOGOUT */}
            <ListItem onClick={(e) => logout(e)}>
                <ListItemPrefix> <PowerIcon className="h-5 w-5 mr-5" /> </ListItemPrefix>
                Odjava
            </ListItem>

            <hr className="my-2 border-blue-gray-50" />

            <ListItem className='pointer-events-none'>
                <ListItemPrefix> <UserCircleIcon className="h-5 w-5 mr-5" /> </ListItemPrefix>
                Dobrodošao {user.name}
            </ListItem>

        </List>
    </Card>
  )
}
