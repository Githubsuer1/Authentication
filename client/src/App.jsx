import { useEffect, useState } from 'react'
import './App.css'
import "tailwindcss";
import { Outlet } from 'react-router-dom';
import Header from './Components/Layout/Header';
import {refreshAccessToken} from './Store/AuthSlice.js';
import {fetchUser} from './Store/AuthSlice.js';
import {useDispatch} from 'react-redux'

function App() {

  return (
    <div className='w-[100vw] h-full min-h-screen bg-amber-200 relative'>
      <Header />
        <Outlet />

    </div>
  )
}

export default App
