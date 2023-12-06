/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserStateContext } from '../context/ContextProvaider';

export default function GuestLayout() {

  const {token} = UserStateContext();

  if(token) {
    return <Navigate to='auth/user-profile' />
  }

  return (
    <Outlet/>
  )
}
