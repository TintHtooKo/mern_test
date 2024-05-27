import React, { useEffect, useState } from 'react'
import './detail.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../helper/axios';

export default function Detail() {
  let {id} = useParams();
  let [post,setPost] = useState('');
  let [comment,setComment] = useState([])
  let [newComment,setNewComment] = useState('')
  let navigate = useNavigate()

  useEffect(() => {
    let fetchPost = async () => {
      try {
        let res = await axios(`/api/detail/`+id);
        if (res.status === 200) {
          setPost(res.data);
          setComment(res.data.comment)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [id]);

  let deletePost = async() =>{
    try {
      let res = await axios.delete('/api/delete/' + id);
      if(res.status == 200){
        navigate('/')
      }
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  }

  const createComment = async() =>{
    try {
      let res = await axios.post(`/comment/${id}/create`,{
        text : newComment
      })
      if(res.status == 200){
        setComment([...comment,res.data])
        setNewComment('')
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className='detail'>
      <div className=' flex items-center justify-end me-5 my-3 space-x-2'>
      <Link to={`/update/${id}`} className='edit'>Edit</Link >
      <button onClick={deletePost} className='delete'>Delete</button>
      </div>
      <div className=' flex items-center min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <h1 className=' text-3xl font-bold mb-3'>{post.title}</h1>
        <p className=' mb-3'>{post.body}</p>
        {post.photo && (post.photo.endsWith('.mp4') ? (
          <video width="320" height="240" controls autoPlay loop>
            <source src={import.meta.env.VITE_BACKEND_URL + post.photo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img className='mb-3' src={import.meta.env.VITE_BACKEND_URL + post.photo} alt="" />
        ))}
        <input value={newComment} onChange={e => setNewComment(e.target.value)} type="text" style={{width:'60%'}} placeholder='Say Something' className='block px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <button onClick={createComment} className='send'>Send</button>
        <hr />
        {comment.map(com=>(
          <div key={com._id}>
            <p >{com.text}</p>
            <hr />
          </div>
        ))}
    </div>   
    </div>
  )
}
