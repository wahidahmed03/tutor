'use client'
import React, { useState } from 'react'

  import { IoIosPerson,IoIosCash ,IoIosCreate,IoIosPeople,IoIosCheckmarkCircleOutline,IoMdContact } from "react-icons/io";


// import app from '../exploreadmission'
import { getFirestore } from "firebase/firestore";
// const db = getFirestore(app);
import { doc, getDoc} from "firebase/firestore"; 
import Link from 'next/link';


function Teacherprofile(props) {
  const admissindata= props.admissindata 
  const Name =admissindata.admissionOnerName || admissindata.TecherName
  const bdZilla =admissindata.TeacherBdZill  || admissindata.TeacherBdDeperment 
  const NeedSubject = admissindata.subject || admissindata.ReadInterrestTeacherSubject  
  const Imgurl = admissindata.imgurl || admissindata.ProfileImgUrl    
  const TeacherSallary=admissindata.TeacherSallary || admissindata.TeacherPreferredSallary
  const id = admissindata.admissionId || admissindata.teacherId
  const carentstatus= "" || admissindata.TeacherCarrentStatus



  return (
   <>
       <div className="w-[330px] h-[450px] bg-gray-800 rounded border-[4px] overflow-hidden	 border-gray-700 hover:border-blue-800 transition-all duration-300">
        <div className="w-full h-full">
          <div className="w-full h-[150px] flex justify-center items-center ">
            <img src={Imgurl} alt=""  className='w-[100px] h-[100px] border-[3px] rounded border-gray-500'  />
          </div>
          <div className="px-3">
            <div className="flex gap-1 justify-center">
              <IoIosPerson size={25} className=' text-gray-100' />
                <h3 className='text-xl text-center uppercase text-gray-100 font-semibold '>{Name}</h3>
            </div>  
          </div>
          <div className="w-full h-[3px] bg-slate-600 my-3"></div>
          <div className="px-3 flex flex-col gap-3 text-gray-400 capitalize">
            <div className="flex gap-1 justify-between group ">
                <div className="flex gap-1">
                  <IoIosPerson size={17} className=' group-hover:text-blue-300' />
                  <h3 className=' text-[12px] mt-[2px] text-center  font-semibold '>Form</h3>
                </div>
                <div className="">
                  <h3 className=' text-[12px] text-center font-semibold group-hover:text-blue-300'>{bdZilla}</h3>
                </div>
            </div>  

            <div className="flex gap-1 justify-between group">
                <div className="flex gap-1">
                  <IoIosCash    size={17} className='group-hover:text-blue-300' />
                  <h3 className=' text-[12px]  text-center  font-semibold '>Give Sallary</h3>
                </div>
                <div className="">
                  <h3 className=' text-[12px] text-center font-semibold group-hover:text-blue-300'>{TeacherSallary} টাকা প্রতি মাসে</h3>
                </div>
            </div>  

            <div className="flex gap-1 justify-between group">
                <div className="flex gap-1 w-[150px]">
                  <IoIosCreate   size={17} className='group-hover:text-blue-300' />
                  <h3 className=' text-[12px]  text-center   font-semibold '>Need Teacher</h3>
                </div>
                {NeedSubject ? <div className=" flex gap-1">
                  {NeedSubject.map((subject) => <h3 className='text-[12px] text-center group-hover:text-blue-300  font-semibold '>{subject}</h3> )}
                </div>:''}
            </div> 


            <div className="flex gap-1 justify-between group">
                <div className="flex gap-1">
                  <IoIosPeople   size={17} className='group-hover:text-blue-300' />
                  <h3 className=' text-[12px]  text-center  font-semibold  '>Current Status</h3>
                </div>
                <div className="">
                  <h3 className=' text-[12px] text-center group-hover:text-blue-300  font-semibold '> {carentstatus}</h3>
                </div>
            </div> 

            <div className="flex gap-1 justify-between group">
              <div className="flex gap-1">
                <IoIosCheckmarkCircleOutline    size={17} className='group-hover:text-blue-500' />
                <h3 className=' text-[12px]  text-center  font-semibold '>Admission Status</h3>
              </div>
              <div className="">
                <h3 className=' text-[12px] text-center group-hover:text-blue-300  font-semibold '>{'Active'}</h3>
              </div>
            </div> 
            <div className="flex w-full mt-2 items-center justify-center gap-2 group border-[1px] h-[40px] hover:h-[42px] rounded hover:bg-blue-900 transition-all duration-300 hover:border-[4px] hover:border-blue-600">
              <IoMdContact  size={20}  className='group-hover:text-blue-300'/>
              <Link href={`/pages/tutor/${id}`} className='text-center group-hover:text-blue-300'>View Profile</Link>
            </div> 
          </div>
        </div>
      </div>
   </>
  )
}

export default Teacherprofile