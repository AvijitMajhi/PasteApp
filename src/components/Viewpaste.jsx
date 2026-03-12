import React ,{ useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { updateToPastes } from '../redux/pasteSlice';
import { addToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Viewpaste = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  return (
    <div  >
  
      <div className='flex flex-row gap-4 place-content-between '>
    <input 
      className='border-1 p-1.5 rounded-lg  mt-2 w-[60%]'
      type="text"
      placeholder='Enter title here'
      value={paste.title}
      disabled
      onChange={(e)=>setTitle(e.target.value)} />
     
      </div>
      <div className='flex justify-center'>
        <textarea className='border-1 p-1.5 mt-4 min-w-[500px] rounded-lg'
         placeholder="Enter content here"
         value={paste.content }
         disabled
         rows={20}
         onChange={(e)=>setValue(e.target.value)} />
      </div>
    </div>
  )
}

export default Viewpaste
