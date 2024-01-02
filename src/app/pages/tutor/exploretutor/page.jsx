'use client'
import React, { useEffect, useState,Suspense  } from 'react'
import Lodingpage from '@/app/components/Lodingpage';

// import Tutor from './components/tutor'
import { IoIosPerson,IoIosCall,IoIosCash   } from "react-icons/io";
import Link from 'next/link';

import app from '@/app/firebase'
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
import { collection, query, where, getDocs } from "firebase/firestore";






function page() {
    const [UpTeacherProfile,setUpTeacherProfile] = useState([])

    useEffect(()=>{
        getteacherprofile()
    },[])

    const getteacherprofile = async ()=>{
        const q = query(collection(db, '/teacher/teacherprofilepublic/teacher'));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setUpTeacherProfile((prevProfiles) => [...prevProfiles, doc.data()]);
          });
    }



  return (
  <>
  <Suspense fallback={<Lodingpage />}>

    <div className="w-full gap-2  min-h-screen   justify-center bg-slate-900 flex flex-wrap px-10 py-10">
        {UpTeacherProfile.map((teacher, index) => (
        <Link key={index} href={`/pages/tutor/${teacher.teacherId}`} className="w-[250px] h-[100px] bg-gray-800 capitalize p-2 border-[3px] border-gray-700 hover:border-blue-700 hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-2 capitalize">
            <div className="w-[70px] h-[60px] rounded-full">
                <img className="w-[55px] h-[55px] rounded-full" src={teacher.ProfileImgUrl} alt="" />
            </div>
            <div className="w-full h-full flex flex-col gap-1">
                <div className="flex gap-1">
                <IoIosPerson size={20} />
                <h4>{teacher.TecherName}</h4>
                </div>
                <div className='flex gap-1'>
                <IoIosCall size={15} />
                <h5 className='text-[12px]'>{teacher.TeacherPhoneNumber}</h5>
                </div>
                <div className='flex gap-1'>
                <IoIosCash size={15} />
                <h5 className='text-[12px]'>{`${teacher.TeacherPreferredSallary || 0} Tk/Month`}</h5>
                </div>
            </div>
            </div>
        </Link>
        ))}
    </div>
    </Suspense>

  </>
  )
}

export default page