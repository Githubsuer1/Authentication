import React from 'react'
import { useSelector } from 'react-redux';

const User = () => {
  const user = useSelector((state)=>state.auth.user);

  return (
    <div className='w-full min-h-screen flex justify-center mt-25'>
      <div className='w-full max-w-lg shadow-2xl'>
        <h1 className='text-center text-2xl font-bold p-2.5'>Username - {user.username.toUpperCase()}</h1>

        <h2 className='text-center'>Role - {user.role.toUpperCase()}</h2>
        <h2 className='text-center'>Email - {user.email.toUpperCase()}</h2>
      </div>
    </div>
  )
}

export default User