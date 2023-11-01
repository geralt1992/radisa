/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import router from './router'
import { RouterProvider } from 'react-router-dom'
import { ContextProvaider } from './context/ContextProvaider'

ReactDOM.createRoot(document.getElementById('root')).render(
   
   <ContextProvaider>
      <RouterProvider router={router} />
   </ContextProvaider>
   
)
