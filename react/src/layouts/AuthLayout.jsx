import { useEffect } from 'react';
import { Navigate, Outlet, Link} from 'react-router-dom';
import { UserStateContext } from '../context/ContextProvaider';
import axiosClient from '../axios';
import React from "react";
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
  ShoppingBagIcon,
  KeyIcon,
  Cog6ToothIcon,
  PowerIcon,
  PencilSquareIcon,
  
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
 
import logo from '../../src/assets/logo2.png'
import Admin from '../pages/Admin'
export default function AuthLayout() {
  const { token, setToken, user, setUser, setAdmin, admin } = UserStateContext();
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    axiosClient.get('me')
      .then(({ data }) => {
        setUser(data.user);
        setAdmin(data.admin);
      })
      .catch((e) => console.log(e));
  }, []);


  if (!token) {
    return <Navigate to="/" />;
  }

  function logout(e) {
    e.preventDefault();
    setToken(null);
    setUser({});
    setAdmin(false);
  }


  return (
  <>
    <div className="flex h-screen">

      <Card className="min-h-full w-full max-w-[20rem] p-4 shadow-xl bg-gray-800 text-white shadow-blue-gray-900/5 rounded-none">
            <div className="mb-2 flex items-center gap-4 p-4">
              <img src={logo} alt="brand" className="h-12 w-12 rounded-3xl " />
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
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal  ml-5">
                      Upravljačka ploča
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Moje Profil
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Moji upitnici
                    </ListItem>
                   
                  </List>
                </AccordionBody>
              </Accordion>
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


                {/* //ADMIN PANEL */}
                {admin && (
                      <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                      <ListItemPrefix>
                        <KeyIcon className="h-5 w-5 "  />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="mr-auto font-normal  ml-5">
                        Admin
                      </Typography>
                    </AccordionHeader>

                )}

                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">

                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Stvori upitnik
                    </ListItem>

                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Neobjavljeni upitnici
                    </ListItem>

                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Aktivni upitnici
                    </ListItem>

                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>

                      Pregled upitnika (po godinama)
                      
                    </ListItem>

                    
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Pregled prijedloga
                    </ListItem>

                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Dodaj učenika
                    </ListItem>

                  </List>

                </AccordionBody>

                
              </Accordion>


              <hr className="my-2 border-blue-gray-50" />


              <ListItem>
                <ListItemPrefix>
                  <PencilSquareIcon className="h-5 w-5 mr-5" />
                </ListItemPrefix>
                Aktivni upitnici
              </ListItem>
              
              <Link to='/auth/surveys'>
                <ListItem >
                  <ListItemPrefix>
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-5" />
                  </ListItemPrefix>
                  Prijedlozi
                </ListItem>  
              </Link>
              
              <ListItem onClick={(e) => logout(e)}>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5 mr-5" />
                </ListItemPrefix>
                Odjava
              </ListItem>

            </List>
          
      </Card>


      <div className="flex-1 p-6 overflow-scroll">
        <div>Dobrodošao {user.name}</div>
        {/* CHECK IF USER IS ADMIN, IF IS IT SHOW ADMIN PAGE */}
        {admin ? (
            <Admin />
          ) : (
            <Outlet />
          )
        }
      </div>
    </div>
  </>
  );
}