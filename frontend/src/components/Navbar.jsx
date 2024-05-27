import axios from '../helper/axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  let {dispatch,user} = useContext(AuthContext)
  let navigate  = useNavigate()
  let logout = async() =>{
    let res = await axios.post('/user/logout')
    if(res.status == 200){
      dispatch({type : 'LOGOUT',})
      navigate('/signin')
    }
  }
  return (
    <nav className=' flex items-center justify-between p-8'>
        <div><Link className=' text-3xl font-bold' to='/'>LOGO</Link></div>
        <ul className=' flex space-x-10 text-lg '>
            <li><Link className=' hover:text-red-700 font-semibold' to='/'>Home</Link></li>
            <li><Link className=' hover:text-red-700 font-semibold' to='/create'>Create</Link></li>
            {!user && <li><Link className=' hover:text-red-700 font-semibold' to='/signin'>Login</Link></li>}
            {!!user && <li><button onClick={logout} className=' hover:text-red-700 font-semibold'>logout</button></li>}
        </ul>
    </nav>
  )
}
