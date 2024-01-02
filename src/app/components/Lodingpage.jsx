import React from 'react'
import Image from 'next/image'
import loding from '../components/img/loding.gif'



function Lodingpage() {
  return (
   <>
    <div className="w-full h-screen bg-slate-800 flex justify-center items-center">
        <Image src={loding} alt="" />
    </div>
   </>
  )
}

export default Lodingpage