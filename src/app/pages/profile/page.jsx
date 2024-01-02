"use client"
import React, { useEffect, useState } from 'react'
import app from '@/app/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
const db = getFirestore(app);
import { useRouter } from 'next/navigation'
import Teacherprofile from '../admission/components/Teacherprofile';
import { doc, getDoc} from "firebase/firestore"; 



function page() {
    const router = useRouter()
    const [LoginUser,setLoginUser] = useState('')
    const [UpTeacherProfile,setUpTeacherProfile] = useState()

    //TecherName
    

  /// HANDLE IS USER LOGIN
  useEffect(()=>{
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setLoginUser(user.email)
    } else {
      router.push('/')
    }
  });
  },[])

  useEffect(()=>{
    if(LoginUser){
        getteacherprofile()
    }
},[LoginUser])


  const getteacherprofile = async ()=>{
    const ref = doc(db, "/teacher/teacherprofile/teacher/", LoginUser);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const ProfileData = docSnap.data();
      // Use a City instance method
      setUpTeacherProfile(ProfileData)
      console.log(ProfileData)
    } else {
      console.log("No such document!");
    }
}



  return (
    <div className=' w-screen min-h-screen bg-slate-900 justify-center items-center'>
        {/* <Teacherprofile admissindata={UpTeacherProfile} /> */}
        
        
    </div>
  )
}

export default page

{/*


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






 */}