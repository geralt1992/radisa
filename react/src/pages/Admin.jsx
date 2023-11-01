/* eslint-disable no-unused-vars */
import React from 'react'
import { UserStateContext } from '../context/ContextProvaider'
import { Navigate } from 'react-router-dom';

export default function Admin() {

  const {admin} = UserStateContext();

  if(!admin) {
    return <Navigate to='/auht/dashboard' />
  } 

  return (
    <div>Admin</div>
  )
}
