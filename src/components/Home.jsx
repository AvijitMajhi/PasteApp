import React ,{ useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { updateToPastes } from '../redux/pasteSlice';
import { addToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {
    const [title,setTitle]=useState("");
    const[value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get('pasteId');
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);
  useEffect(()=>{

  if(pasteId){
    const paste = allPastes.find((p)=>p._id === pasteId);

    if(paste){
      setTitle(paste.title);
      setValue(paste.content);
    }
  }

},[pasteId]);
    function createPaste(){
      const paste={
        title,
        content: value,
        _id: pasteId || 
        Date.now().toString(36),
        createdAt:new Date().toISOString(),
      }
      if (pasteId){
           dispatch(updateToPastes(paste));
      }
      else{
        if(paste.title) {dispatch(addToPastes(paste));}
        else toast("title should not be empty")
      }
      setTitle('');
      setValue('');
      setSearchParams({});
    }
  return (
    <div  >
  
      <div className='flex flex-row gap-4 place-content-between '>
    <input 
      className='border-1 p-1.5 rounded-lg  mt-2 w-[60%]'
      type="text"
      placeholder='Enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)} />
      <button onClick={createPaste} className='border-1 p-1.5 rounded-lg  mt-2 '>
       {pasteId ? "Update Paste":"Create Paste"}
      </button>
      </div>
      <div className='flex justify-center'>
        <textarea className='border-1 p-1.5 mt-4 min-w-[500px] rounded-lg'
         placeholder="Enter content here"
         value={value} 
         rows={20}
         onChange={(e)=>setValue(e.target.value)} />
      </div>
    </div>
  )
}

export default Home
