import { useNavigate, useParams } from 'react-router-dom'
import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'

export default function Update() {
    let [title,setTitle] = useState('')
    let [body,setBody] = useState('')
    let {id} = useParams()
    let [file,setFile] = useState(null)
    let [preview,setPreview] = useState(null)
    let navigate = useNavigate()

    useEffect(()=>{
        let post = async(req,res) =>{
        try {           
                if(id){
                    let res = await axios.get('/api/detail/'+id)
                    if (res.status == 200){
                        setTitle(res.data.title)
                        setBody(res.data.body)
                    }
                }           
        } catch (error) {
            console.log(error.message);
        }
    }
        post();
    },[id])

    let updateSubmit = async(e) =>{
        try {
            e.preventDefault()
            let data = {
                title,
                body
            }
            let res = await axios.put('/api/update/'+id ,data)

            if(file){
              let formData = new FormData;
              formData.set('photo',file)

              let uploadPhoto = await axios.post(`/api/${res.data._id}/upload`,formData,{
                headers : {
                  Access : 'multipart/form-data'
                }
              })
            }

            if(res.status == 200){
                navigate('/')
            }
        } catch (e) {
            console.log(e.message);
        }        
    }

    let upload = (e) =>{
      let file = e.target.files[0]
      setFile(file)

      let fileReader = new FileReader;
      fileReader.onload = (e) => {
        setPreview(e.target.result)
      }
      fileReader.readAsDataURL(file)
    }


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Post</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={updateSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Post Title</label>
            <div className="mt-2">
              <input value={title} onChange={e=>setTitle(e.target.value)}  id="title" name="title" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">Post Body</label>
            </div>
            <div className="mt-2">
              <input value={body} onChange={e=>setBody(e.target.value)} id="body" name="body" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Post Image</label>
            </div>
            <div className="mt-2">
              <input onChange={upload} id="image" name="image" type="file" className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            {preview && <img src={preview} alt="" />}
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}
