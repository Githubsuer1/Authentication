import {React,useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser,refreshAccessToken } from '../index.js'
import { Link } from 'react-router-dom';



const Home = () => {
  // state management
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  // console.log(token);
  // console.log(user);
  

  



  return (
    <div className='p-4 w-full h-full min-h-screen flex flex-col items-center '>

      <h1 className="animated-text text-xl sm:text-2xl text-center font-bold ">Welcome</h1>

      {user ? 
      (
        <div className='w-full max-w-4xl shadow-2xl p-4 relative flex'>
          <h1 className="text-2xl text-center w-full">Welcome <strong>{user.username}</strong>, you have successfully logged in.😊</h1>
        </div>
      ) 
      : 
      (
        <div className='w-full h-96 shadow-2xl rounded max-w-xl flex flex-col justify-center items-center'>
          <p className="sm:text-lg text-amber-500 p-4 font-bold">Log in to explore...</p>
          <Link to="/login">
            <button className='px-8 py-2.5 text-white bg-black rounded'>Login </button>
          </Link>
        </div>
      )
      }

    </div>
  )
}

export default Home