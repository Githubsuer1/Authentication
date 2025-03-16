import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../index.js'
import User from '../General/User.jsx';

const Header = () => {
  const [open,setOpen] = useState(false);
  const token = useSelector((state)=>state.auth.token);
  const user = useSelector((state)=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = ()=>{
    dispatch(logout());
    navigate('/login');
  }
  
  return (
    <header className='h-16 w-full bg-black flex items-center justify-between relative'>
      {/* nav-menu */}
        <div className='w-1/2'>
        
          <div className={`${open?"absolute z-30 top-0 left-0 w-[50%] sm:w-1/5 bg-black/70 ":""}`}>

            {/* Open/Close Icon */}
            <button
              className={`text-amber-400 p-4 transition-all duration-500 linear ${open ? "" : "hover:bg-white/20"}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <MdClose size={36} /> : <MdOutlineMenu size={36} />}
            </button>

            {/* Navigation Links */}

                {open && (
                  <ul className="text-amber-400 list-none">
                    <li className='p-3 shadow'><Link to="/">Home</Link></li>

                    {user ? 
                      (
                        <>
                          <li className='p-3 shadow'><Link to="/getuser">User</Link></li>
                          <li className='p-3 shadow'><button onClick={handleLogout}>Logout</button></li>
                        </>   
                      ) : (
                        <li className='p-3 shadow'><Link to="/login">Login or Register</Link></li>
                      )
                    }
                  </ul>
                  )}

          </div>
        </div>

      {/* logo */}
      <div className='w-1/2 flex items-center justify-end'>
        <Link 
          className=' p-4 sm:text-2xl font-bold text-amber-400
           transition-all duration-500 linear 
           hover:bg-white/20' 
          to="/"
          >
          Authentication
        </Link>
      </div>
    </header>
  )
}

export default Header