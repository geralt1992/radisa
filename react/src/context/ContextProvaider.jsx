/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvaider = ({children}) => {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [token, _setToken] = useState(localStorage.getItem('TOKEN') || '');

    const setToken = (token) => {
        if(token) {
            localStorage.setItem('TOKEN' , token);
        } else {
            localStorage.removeItem('TOKEN');
        }

        _setToken(token);
    };

    return (
        <StateContext.Provider value={{user, token, admin, setUser, setToken, setAdmin}} >
            {children}
        </StateContext.Provider>
    )
}

export const UserStateContext = () => useContext(StateContext);