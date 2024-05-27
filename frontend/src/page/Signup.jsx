import axios from '../helper/axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  let[username,setUsername] = useState('')
  let[email,setEmail] = useState('')
  let[password,setPassword] = useState('')
  let[confirmPass,setConfirmPass] = useState('')
  let[error,setError] = useState(null)
  let navigate = useNavigate()

  const Register = async(e) =>{
    try {
      e.preventDefault()
      let data = {
        username,
        email,
        password
      }
      if(password != confirmPass){
        setError('Password does not match');
      }else{
        let res = await axios.post('/user/register',data,{
          withCredentials : true
        })
        if(res.status == 200){
          navigate('/signin')
        }
      }
    } catch (e) {
      setError(e.response.data.error);
    }
  }


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up new account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={Register} className="space-y-6" action="#" method="POST">
      <p className=' text-red-600 font-bold text-center'>{error}</p>
      {!!(error && error.email) && <p className=' text-red-600 font-bold text-center'>{error.email.msg}</p>}
    <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div className="mt-2">
          <input value={username} onChange={e=>setUsername(e.target.value)} id="name" name="name" type="text" autoComplete="name" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
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
        <div className="flex items-center justify-between">
          <label htmlFor="setpassword" className=" px-3 block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        </div>
        <div className="mt-2">
          <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} id="setpassword" name="setpassword" type="password" autoComplete="current-password" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Are You a member?
      <Link to='/signin' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
    </p>
  </div>
</div>
  )
}
