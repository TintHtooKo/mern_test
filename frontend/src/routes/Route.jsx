import React, { useContext } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import Create from '../page/Create'
import Signin from '../page/Signin'
import Signup from '../page/Signup'
import Detail from '../page/Detail'
import Update from '../page/Update'
import { AuthContext } from '../context/AuthContext'

export default function Route() {
    let {user} = useContext(AuthContext)
    const router = createBrowserRouter([
        {
            path : '/',
            element: <App/>,
            children : [
                {
                    path:'/',
                    element:user ? <Home/> : <Navigate to={'/signin'}/>
                },
                {
                    path:'/create',
                    element:user ? <Create/> : <Navigate to={'/signin'}/>
                },
                {
                    path:'/signin',
                    element: <Signin/> 
                },
                {
                    path:'/signup',
                    element:<Signup/>
                },
                {
                    path:'/detail/:id',
                    element:<Detail/>
                },
                {
                    path:'/update/:id',
                    element:<Update/>
                },
            ]
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
