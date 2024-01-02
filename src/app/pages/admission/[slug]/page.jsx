'use client'
import React, { useEffect, useState} from 'react'
import Teacherprofile from '../components/Teacherprofile'


/// FIREBASE 
import app from '@/app/firebase'
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
import { doc, getDoc} from "firebase/firestore"; 
import TeacherAdmissiondetails from '../components/TeacherAdmissionData';
import Lodingpage from '@/app/components/Lodingpage';




function page({params}) {
    const [admissionIdpath,setadmissionIdpath]=useState(params.slug)

    const [UpAdmissionData,setUpAdmissionData] = useState([])
    useEffect(()=>{
      getteacherprofile()
    },[])

    const getteacherprofile = async ()=>{
      const ref = doc(db, "/teacher/teacheradmission/admission", admissionIdpath);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        // Convert to City object
        const admissionData = docSnap.data();
        // Use a City instance method
        setUpAdmissionData(admissionData)
      } else {
        console.log("No such document!");
      }
    }



  return (
    <> 
      <div className='w-full min-h-screen max-h-full py-10 lg:h-screen bg-slate-900 flex justify-center gap-3 flex-wrap px-5 lg	:py-0 items-center'>
        <Teacherprofile admissindata={UpAdmissionData} />
        <TeacherAdmissiondetails admissindata={UpAdmissionData} admissionId={admissionIdpath} />
      </div>
    </>

  )
}

export default page