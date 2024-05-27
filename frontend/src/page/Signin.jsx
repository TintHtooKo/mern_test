import axios from '../helper/axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export default function Signin() {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [error,setError] = useState(null)
  let navigate = useNavigate()
  let {dispatch} = useContext(AuthContext)

  const Login = async(e) =>{
    try {
      e.preventDefault()
      let data = {
        email,
        password
      }
      let res = await axios.post('/user/login',data,{
        withCredentials : true
      })
      console.log(res);
      if(res.status == 200){
        dispatch({type : 'LOGIN',payload : res.data.user})
        navigate('/')
      }
    } catch (e) {
      setError(e.response.data.error)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={Login} className="space-y-6" action="#" method="POST">
    <p className=' text-red-600 font-bold text-center'>{error}</p>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} onChange={e=>setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input value={password} onChange={e=>setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
    </p>
  </div>
</div>
  )
}
