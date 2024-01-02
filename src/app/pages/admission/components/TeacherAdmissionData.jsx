"use client"
import React, { useEffect, useState,Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Lodingpage from '@/app/components/Lodingpage';
import Link from 'next/link'






import { IoIosGitBranch, IoIosExpand,IoIosJournal,IoIosArrowRoundForward,IoIosPin ,IoIosExit,IoMdCash,IoIosBriefcase } from "react-icons/io";

///  IMPORT FIREBASE
import app from "@/app/firebase"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc,getFirestore,setDoc } from "firebase/firestore";
const db = getFirestore(app);

///



/// utilitis
import {createToken} from '../components/utilitis'



function TeacherAdmissiondetails(props) {
    
    const admissionId=props.admissionId
    const admissindata= props.admissindata
    const Title = admissindata.Title
    const details = admissindata.details
    const subject = admissindata.subject
    const TeacherClass = admissindata.TeacherClass
    const TeacherGroup = admissindata.TeacherGroup
    const StudentClassLevel= admissindata.StudentClassLevel
    const StudentClass= admissindata.StudentClass
    const StudentClassGroup= admissindata.StudentClassGroup
    const TeacherBdDeperment = admissindata.TeacherBdDeperment
    const TeacherBdZill = admissindata.TeacherBdZill
    const TeacherSallary = admissindata.TeacherSallary

    //// ROUTER
    const router = useRouter()

    //////
    const [login,setlogin]= useState(false)
    const [UserData,setUserData] = useState()
    const [userEmail,setuserEmail] = useState()
    const [upTeacherInfo,setupTeacherInfo] = useState()

    /// 
    const [TeacherId,setTeacherId] = useState()
    const [unicId,setunicId]=useState()

    /// 
    const [LodingStatus,setLodingStatus] = useState(false)

 


    // /// Ganart unic id
    useEffect(()=>{
        if(admissionId){
        const id = admissionId.replace(/\s/g, "")+createToken(6).toLocaleLowerCase();
        setunicId(id)
        }
       },[admissionId])


    const Handleapply =()=>{
        CheackLogin()
        setLodingStatus(true)
    }

    const CheackLogin =() =>{
        console.log("asas")

    /// CHEACK USER IS LOGIN
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setlogin(true)
        setUserData(user)
        setuserEmail(user.email)
      } else {
        router.push('./pages/forms/login')
      }
    });
}

//// CALL SERVER TO GET TEACHER INFO

const getteacherprofile = async ()=>{

    if(userEmail){
        const ref = doc(db, "/teacher/teacherprofile/teacher/", userEmail);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          // Convert to City object
          const upteacherData = docSnap.data();
          setTeacherId(upteacherData.teacherId)
          // Use a City instance method
          setupTeacherInfo(upteacherData)
        } else {
          console.log("No such document!");
        }
    }
}

 useEffect(()=>{
    if(userEmail){
        getteacherprofile()
    }
 },[userEmail])





//   //// SEND NOTIFICATION DATA TO SERVER
  const   SendWnerIdToFirebase = async ()=>{
    await setDoc(doc(db, `/teacher/teacheradmission/admissionapply/`, unicId ), {
        admissionId:admissionId,
        TeacherId:TeacherId,
        userEmail:userEmail
  })
  router.push('/pages/admission/exploreadmission')
}
useEffect(()=>{
    if(  TeacherId){
        SendWnerIdToFirebase()
    }
},[TeacherId])

    


  return (
    <>
    {LodingStatus ? <Lodingpage />:"" }
    <div className="max-w-[850px] min-h-[470px] relative px-4 py-4 bg-gray-800 capitalize rounded text-gray-300 border-[4px] border-gray-700 hover:border-blue-800 transition-all duration-300">
        <div className="">
            <div className="flex gap-1 items-center group border border-gray-600 p-[10px]">
                <h6></h6>
                <div className="flex gap-1 items-center">
                    <IoIosGitBranch className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{Title}</h6>

                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 py-[10px]">
               {/**  <h6> </h6> */}
                <div className="flex gap-1">
                    <IoIosExpand  size={22} className=' group-hover:text-blue-400 transition-all duration-300 w-[200px]' /><p>{details}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>বিষয়  </h6> 
     {subject?  <div className="flex gap-1 items-center">
                    {subject.map(subject =><><IoIosJournal   className=' group-hover:text-blue-400 transition-all duration-300' size={18} /><h6>{subject}</h6></>)}
                </div>:''}
                <h6>পড়াতে হবে </h6>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                 <h6> শিক্ষকের যোগ্যতা </h6> 
               <div className="flex gap-1 items-center">
                    <IoIosBriefcase className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{TeacherClass}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoIosBriefcase className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{TeacherGroup?TeacherGroup:""}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                 <h6> ছাত্র </h6> 
               <div className="flex gap-1 items-center">
                    <IoIosArrowRoundForward  className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{StudentClassLevel}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoIosArrowRoundForward  className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{StudentClass}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoIosArrowRoundForward  className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{StudentClassGroup?StudentClassGroup:""}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6> ঠিকানা </h6> 
               <div className="flex gap-1 items-center">
                    <IoIosPin  className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{TeacherBdDeperment}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoIosPin  className=' group-hover:text-blue-400 transition-all duration-300 ' size={22} /><h6>{TeacherBdZill}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>বেতন </h6>
                <div className="flex gap-1 items-center">
                   <IoMdCash    className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{TeacherSallary} টাকা  প্রতি মাস</h6>
                </div>
               
            </div>

        </div>
        <div className="flex gap-3 items-center group  cursor-pointer mt-3 " onClick={Handleapply}>
                <div className="flex gap-3 group-hover:bg-blue-500 items-center px-5 py-3 border-[3px] border-gray-600 transition-all duration-300">
                   <IoIosExit    className='text-blue-500 group-hover:text-blue-100 transition-all duration-300' size={22} /><h6>আবেদন করুন </h6>
                </div>
         </div>
     </div>

    </>
  )
}

export default TeacherAdmissiondetails