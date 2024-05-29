import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import axios from '../helper/axios'
import { Link, useOutletContext } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'



export default function Home() {
  let [post,setPost] = useState([])
  const { searchQuery } = useOutletContext()

  useEffect(()=>{   
      let fetchPost = async()=>{
        try {
        let res = await axios('/api/')
        if(res.status == 200) {
          let data = res.data
          setPost(data);
        }
      }catch (error) {
        console.log(error);
      }
    } 
    fetchPost()
  },[])

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' .......' : text;
  };

  const formatCreatedAt = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const filteredPosts = post.filter(p => p.title.toLowerCase().includes(searchQuery) || 
                        p.body.toLowerCase().includes(searchQuery))

  return (
    <div className=' grid grid-cols-3 space-x-2 space-y-3'>
    { !!filteredPosts.length && filteredPosts.map((p)=>(
      <div className='card' key={p._id} >
      <h1 className=' text-2xl font-bold mb-3'>{p.title}</h1>
      <p className=' mb-3'>{truncateText(p.body, 10)}</p>
      {p.photo && p.photo.endsWith('.mp4') ? (
            <video width="320" height="240" autoPlay loop>
              <source src={import.meta.env.VITE_BACKEND_URL + p.photo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={import.meta.env.VITE_BACKEND_URL + p.photo} alt="" />
          )}
      <p>Created At : {formatCreatedAt(p.createdAt)}</p>
      <Link className=' btn' to={`/detail/${p._id}`}>See detail...</Link>
      </div>
    )) }    
    </div>
  )
}
