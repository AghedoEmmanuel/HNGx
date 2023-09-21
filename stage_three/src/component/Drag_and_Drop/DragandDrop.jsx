import { useState, useRef } from 'react'
import SignOut from './SignOut'
import Parameter from './Parameter'


const DragandDrop = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-6 pt-10'>
      <Parameter/>
      <SignOut />
    </div>
  )
}

export default DragandDrop