import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
    <Navbar/>
    <div className=' p-5'>
      <Outlet/>
    </div>
    </>
  )
}
