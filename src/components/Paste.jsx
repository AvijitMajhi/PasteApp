import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes=useSelector((state)=>state.paste.pastes);
  const dispatch=useDispatch();
  const[searchTerm,setSearchTerm]=useState('');
  const filteredData=pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  
function handleShare(paste) {
 navigator.share({
  title: paste.title,
  text: "Copy and paste jaldi something special...",
  url: `${window.location.origin}/pastes/${paste._id}`
});
}

  return (
    <div>
     <input className='p-2 border-1 rounded-2xl mt-5 min-w-[600px] ' type="search" placeholder='search here' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
     <div className='flex flex-col gap-4'>
    {
      filteredData.length>0 && 
      filteredData.map(
        (paste)=>{
          return(
            <div className='border-1 mt-3 rounded-2xl p-2' key={paste?._id}> 
            <div>
                   {paste.title }
            </div>
                 <div>
                   {paste.content }
            </div>
            <div className='flex flex-row place-content-evenly'>
                 <button  className='border-1 rounded-2xl p-2' >
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                 </button>
                  <button  className='border-1 rounded-2xl p-2'  >
                  <a href={`/pastes/${paste?._id}`}>View</a>
                 </button>
                  <button  className='border-1 rounded-2xl p-2' onClick={()=>handleDelete(paste?._id)}>
                  Delete
                 </button>
                  <button  className='border-1 rounded-2xl p-2' 
                  onClick={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to Clipboard")
                  }} >
                  Copy
                 </button>
                  <button  className='border-1 rounded-2xl p-2'  onClick={() => handleShare(paste)}>
                  Share
                 </button>
            </div>
            <div>
              {paste.createdAt}
            </div>
            </div>
         
          )
        }
      )
    }
     </div>
    </div>
  )
}

export default Paste
