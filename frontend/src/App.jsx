import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  const [searchQuery,setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  return (
    <>
    <Navbar onSearch={handleSearch}/>
    <div className=' p-5'>
      <Outlet context={{ searchQuery }} />
    </div>
    </>
  )
}
