'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


import app from '@/app/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

const db = getFirestore(app);


// IMPORT FOMPONETS 
import Teacherprofile from '../admission/components/Teacherprofile';
import TeacherAdmissiondetails from '../admission/components/TeacherAdmissionData';

function page() {
    const router = useRouter()
    const [UserEmail,setUserEmail] = useState()
    const [admissionId,setadmissionId] = useState()
    const [UpAdmissionData,setUpAdmissionData] = useState([])
    const [teacherProfileIdData,setteacherProfileIdData] = useState([])
    const [applyTeacher,setapplyTeacher] = useState([])




  // CHEACK USER IS LOGIN
    /// HANDLE IS USER LOGIN
    useEffect(()=>{
        const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUserEmail(user.email)
        } else {
          router.push('/')
        }
      });
      },[])

      
      useEffect(()=>{
        if(UserEmail){
            GetAdmissionId()
        }

      },[UserEmail])

    /// GET ADMISSION ID
    const GetAdmissionId= async ()=>{
    const q = query(collection(db, `/teacher/teacheradmisionwner/admissionwar/`), where("UserEmail", "==", UserEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setadmissionId(doc.data().admissionwarid)
    });
    }


  const DashbordData= async ()=>{
    const q = query(collection(db, `/teacher/teacheradmission/admission/`), where("admissionId", "==", admissionId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setUpAdmissionData(doc.data())
    });
  }

  const WhoadmissionApllyId= async ()=>{
    const q = query(collection(db, `/teacher/teacheradmission/admissionapply`), where("admissionId", "==", admissionId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setteacherProfileIdData((TeacherId) => [...TeacherId, doc.data()]);
    });
  }

  useEffect(()=>{
    if(admissionId){
        DashbordData()
        WhoadmissionApllyId()
    }
  },[admissionId])

  useEffect(()=>{
    if(teacherProfileIdData){
        teacherProfileIdData.map((items)=>{
            getTeacherProfile(items)
        })
    }
  },[teacherProfileIdData])

  const getTeacherProfile = async(items)=>{
    const q = query(collection(db, `/teacher/teacherprofilepublic/teacher/`), where("teacherId", "==", items.TeacherId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
 
        setapplyTeacher((teacher) => [...teacher, doc.data()]);
    });
  }



  return (
    <>
    <div className=" w-screen min-h-screen items-center px-10 py-10 bg-gray-900">
       {UpAdmissionData ?<div className=' flex gap-2  items-center justify-center flex-wrap' > <Teacherprofile admissindata={UpAdmissionData} />
       <TeacherAdmissiondetails admissindata={UpAdmissionData} admissionId={admissionId} /> </div> :""}
       <div className="">
            <h6 className=' text-center py-5 pt-16'>WHOS APPLY YOUR APLICATION</h6>
            <div className="w-full h-full py-5 px-5 flex flex-wrap items-center justify-center gap-3">
                {applyTeacher ? applyTeacher.map((mapUpAdmissionData) => <Teacherprofile admissindata={mapUpAdmissionData} /> )
                :""}
            </div>
       </div>
    </div>
    </>
  )
}

export default page