"use client"
import React, { useEffect, useState, Suspense  } from 'react'
import Teacherprofile from '../components/Teacherprofile';
import Lodingpage from '@/app/components/Lodingpage';
import app from '@/app/firebase'



// IMPORT ICON
import { IoMdGitCompare,IoIosExpand,IoIosPerson,IoIosCheckboxOutline  } from "react-icons/io";
import Link from 'next/link';

////
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
import { collection, query, where, getDocs } from "firebase/firestore";



function page() {

  const [UpTeacherProfile,setUpTeacherProfile] = useState([])
  console.log(UpTeacherProfile)

  useEffect(()=>{
      getteacherprofile()
  },[])

  const getteacherprofile = async ()=>{
      const q = query(collection(db, '/teacher/teacheradmission/admission/'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUpTeacherProfile((prevProfiles) => [...prevProfiles, doc.data()]);
          console.log(doc.data())
        });
  }

  return (
    <>
      <Suspense fallback={<Lodingpage />}>
      <div className='w-screen h-screen bg-slate-900 items-center justify-center flex flex-wrap	'>
    {UpTeacherProfile ? (
      <div className="items-center justify-center flex flex-wrap gap-2 py-5">
        {UpTeacherProfile.map((admission) => (
          <div key={admission.id} className="w-[420px] h-[250px] bg-slate-800 overflow-hidden	 border-[3px] border-gray-700 hover:border-blue-700 transition-all duration-300 ">
            <div className="p-2 py-3 group  flex items-center gap-2 w-[22000px]">
              <IoMdGitCompare className='group-hover:text-blue-400 transition-all duration-200' />
              <h5 className='capitalize w-[500px]'>{admission.Title}</h5>
            </div>
            <div className="p-2 py-1 group  flex gap-2 w-full h-[135px] overflow-hidden">
              <div className="w-[20px] h-[20px]">
                <IoIosExpand className='group-hover:text-blue-400 transition-all duration-200' />
              </div>
              <h5 className='capitalize'>
                {admission.details}
              </h5>
            </div>
            <div className=" flex  gap-2 justify-between items-end mt-2 ">
              <Link href={`/pages/admission/${admission.admissionId}`} className="px-8 py-3 border-[2px] border-gray-700  hover:bg-blue-500 flex justify-center gap-2 items-center transition-all duration-300">
                <IoIosCheckboxOutline  />
                <div className=''>Apply</div>
              </Link>
              <div className="px-4 py-3 group  flex items-center  gap-2">
                <IoIosPerson  className='group-hover:text-blue-400 transition-all duration-200' />
                <h5 className='capitalize'>{admission.admissionOnerName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : ""}





    </div>
</Suspense>
    </>
 
  )
}

export default page