'use client'
import React, { useEffect, useState, useContext  } from 'react'
import { useRouter } from 'next/navigation'

// IMPORT ICON
import { ReadingDays, TeacherPreferredStudentClass} from '../Data/ClassName'
import { IoIosPerson } from "react-icons/io";

// FIREBASE
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '@/app/firebase'
import { doc, setDoc,getFirestore } from "firebase/firestore"; 
const db = getFirestore(app);

import {createToken} from '../components/utilitis'

// IMPORT COMPONENTS
import Option from '../components/LocationOption';
import InputSubjectName from '../components/InputSubjectName';
import AcpedtedTeacherClassFled from '../components/AcpedtedTeacherClassFled';
import SelectesMedium from '../components/SelectesMedium';
import CarentStatus from '../components/CarentStatus';
import Oneoptionform from '../components/Oneoptionform';
import TeacherPreferredStudentClassCom from '../components/TeacherPreferredStudentClass';

/// IMPORT FIREBASE
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";



function page() {

  const router = useRouter()

  // FORM DATA SATE
  const [TecherName,setTecherName] = useState()
  const [FormTeacherClass,setFormTeacherClass] = useState()
  const [FormTeacherGroup,setFormTeacherGroup] =useState()
  const [ReadInterrestTeacherSubject,setReadInterrestTeacherSubject] = useState()
  const [TeacherBdDeperment,setTeacherBdDeperment] = useState()
  const [TeacherBdZill,setTeacherBdZill] = useState()
  const [TeacherPhoneNumber,setTeacherPhoneNumber]=useState()
  const [TeacherEmailNumber,setTeacherEmailNumber]=useState()
  const [TeacherPreferredSallary,setTeacherPreferredSallary] = useState()
  const [TeacherCarrentStatus, setTeacherCarrentStatus] = useState()
  const [teaccherReadingDay, setteaccherReadingDay] = useState()
  const [TeacherInterstedMeduim,setTeacherInterstedMeduim] = useState()
  const [TeacherIntersteClass,setTeacherIntersteClass] = useState()
  const [teacherId,setteacherId] = useState()
  const [uploadProfileImg,setuploadProfileImg]= useState()
  const [ProfileImgUrl, setProfileImgUrl] = useState('')

/// 
  const [LoginUser,setLoginUser] = useState('')
  const[sendDataSucc,setsendDataSucc] = useState(false)
  const [sendDataSuccNo,setsendDataSuccNo]=useState()
  const [rederectCoutn,setrederectCoutn]=useState('after 5s')

  const [count, setCount] = useState(0);

  //// GENARATE USER ID
 useEffect(()=>{
  if(TecherName){
  const id = TecherName.replace(/\s/g, "")+createToken(6).toLocaleLowerCase();
  setteacherId(id)
  }
 },[TecherName])



  const UpcomingTeacherClass = (data) => {
    setFormTeacherClass(data[0].teacherClass)
    setFormTeacherGroup(data[0].teacherGroup)
  };

  const UpcomeTexherSubjectData = (data) =>{
    setReadInterrestTeacherSubject(data)
  }

  
  const UpComingTeacherLocation =(data)=>{
    setTeacherBdDeperment(data[0].StudentDeperMent)
    setTeacherBdZill(data[0].StudentZilla)

  }
  
  const UpcomingTteacheStatus = (data) => {
    setTeacherCarrentStatus(data)
  };
  
  const UpComingTechetReadingDay = (data) => {
    setteaccherReadingDay(data)
  };

  const upcomingInterstedMeduim = (data) => {
    setTeacherInterstedMeduim(data);
  };

  const upcomingInterstedclass = (data) => {
    setTeacherIntersteClass(data)
  };


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

  /// HANDLE SUBMIT FORM 
  const handleSubmit = ()=>{
    if(LoginUser){
      UploadProfileImg()
    }
  }

  useEffect(()=>{
    if(ProfileImgUrl){
      SendDataToFirebase()
      SendDataToFirebaseTeacherprofile()
  }
  },[ProfileImgUrl])

 const   SendDataToFirebase = async ()=>{
  await setDoc(doc(db, `teacher/teacherprofile/teacher/`, LoginUser ), {
    "TecherName":TecherName,
    "FormTeacherClass":FormTeacherClass,
    "FormTeacherGroup":FormTeacherGroup,
    "ReadInterrestTeacherSubject":ReadInterrestTeacherSubject,
    "TeacherBdDeperment" :TeacherBdDeperment,
    "TeacherBdZill":TeacherBdZill,
    "TeacherPhoneNumber":TeacherPhoneNumber,
    "TeacherEmailNumber":TeacherEmailNumber,
    "TeacherPreferredSallary":TeacherPreferredSallary,
    "TeacherCarrentStatus":TeacherCarrentStatus,
    "teaccherReadingDay":teaccherReadingDay,
    "TeacherInterstedMeduim":TeacherInterstedMeduim,
    "TeacherIntersteClass":TeacherIntersteClass,
    'ProfileImgUrl':ProfileImgUrl,
    teacherId:teacherId,
    ProfileImgUrl:ProfileImgUrl
})
  setsendDataSucc(true)
}

const   SendDataToFirebaseTeacherprofile = async ()=>{
  await setDoc(doc(db, `/teacher/teacherprofilepublic/teacher/`, teacherId ), {
    "TecherName":TecherName,
    "FormTeacherClass":FormTeacherClass,
    "FormTeacherGroup":FormTeacherGroup,
    "ReadInterrestTeacherSubject":ReadInterrestTeacherSubject,
    "TeacherBdDeperment" :TeacherBdDeperment,
    "TeacherBdZill":TeacherBdZill,
    "TeacherPhoneNumber":TeacherPhoneNumber,
    "TeacherEmailNumber":TeacherEmailNumber,
    "TeacherPreferredSallary":TeacherPreferredSallary,
    "TeacherCarrentStatus":TeacherCarrentStatus,
    "teaccherReadingDay":teaccherReadingDay,
    "TeacherInterstedMeduim":TeacherInterstedMeduim,
    "TeacherIntersteClass":TeacherIntersteClass,
    teacherId :teacherId,
    ProfileImgUrl:ProfileImgUrl
})
  setsendDataSucc(true)
}

// UPLOAD IMG 
const UploadProfileImg = ()=>{
  const storage = getStorage();
  const storageRef = ref(storage, 'img/'+uploadProfileImg?.name);
  uploadBytes(storageRef, uploadProfileImg).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    }).then(resp =>{
    getDownloadURL(storageRef).then((url)=> {
    setProfileImgUrl(url)
    })})
}

  useEffect(()=>{
    if(sendDataSucc){
      ProfileComplite()
      setTimeout(()=>{
        router.push('/')
      },3000)
    }
  },[sendDataSucc])

  const ProfileComplite =()=>{
    const db = getFirestore(app);
    setDoc(doc(db, "/user/ProfileInfo/CompliteProfile", LoginUser ), {
      CompliteProfile: true,
  });
  }



  return (
    <>
    <div className=' relative pb-4'>
    <div className=" w-[100%] py-10 dark:bg-slate-900 flex flex-col lg:h-screen">
      <p className=' text-lg text-center pt-[45px] p-1'>আপনি কি একজন শিক্ষক ?</p>
     <form >
      <div className="lg:p-[20px] lg:flex justify-center ">
         <div className="w-full lg:w-[50%] flex flex-col items-center justify-center gap-2 pl-0 xl:pl-32 ">

          {/**আপনার নাম লিখুন **/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
              <IoIosPerson className='text-gray-400 mx-[3px] group' size={25} />
              <input type="text" onChange={(e)=>setTecherName(e.target.value)} placeholder='আপনার নাম লিখুন ' required className='group capitalize dark:bg-gray-800 py-1 w-full outline-none text-gray-100 text-base font-semibold' />
          </div>

          {/**আপনার যোগ্যতা নির্ধারণ করুন**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
            <AcpedtedTeacherClassFled UpcomingData={UpcomingTeacherClass} />
          </div>
            

          {/**কোন কোন  বিষয়ে শিক্ষক  তা লিখুন**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            <InputSubjectName UpcomingData={UpcomeTexherSubjectData} />
          </div>

          {/** location**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px]">
           <Option  UpcomingData={UpComingTeacherLocation} />
          </div>

          {/** আপনার ফোন নম্বর  লিখুন **/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            <input type="number"  onChange={(e)=>setTeacherPhoneNumber(e.target.value)} placeholder='আপনার ফোন নম্বর  লিখুন' required className='group pl-1 dark:bg-gray-800 py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
          </div>

          {/** আপনার ইমেইল নম্বর  লিখুন  **/} 
            <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            <input type="email"  onChange={(e)=>setTeacherEmailNumber(e.target.value)} placeholder='আপনার ইমেইল নম্বর  লিখুন @Email.com ' required className='group pl-1 dark:bg-gray-800 py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
          </div>


          {/**আপনি কত বেতন নেবেন  তা লিখুন**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            <input type="number"  onChange={(e)=>setTeacherPreferredSallary(e.target.value)} placeholder='আপনি কত বেতন নেবেন  তা লিখুন' required className='group pl-1 dark:bg-gray-800 py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
          </div>

         {/**আপনি এখন কি করেন**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
            <CarentStatus UpcomingData={UpcomingTteacheStatus} />
          </div>
        </div>


        <div className="w-full lg:w-[50%] flex flex-col items-center mt-2 lg:mt-0  gap-2 pl-0">

         {/**আপনি সপ্তায় কয় দিন পড়াবেন**/} 
         <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
            <Oneoptionform UpcomingData={UpComingTechetReadingDay} OptionData={ReadingDays} />
          </div>

          {/**intarested Meduim**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
          <SelectesMedium UpcomingData={upcomingInterstedMeduim} />
          </div>

          {/**intarested Class**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
            <TeacherPreferredStudentClassCom UpcomingData={upcomingInterstedclass} />
          </div>

          {/** UPLOAD IMG**/} 
          <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            <input type="file" accept='image/*' onChange={(e)=>setuploadProfileImg(e.target.files[0])}  required className='group pl-1 dark:bg-gray-800 py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
          </div>

          <div  className=" cursor-pointer w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px] h-[45px] text-center  bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
              <div  className=" group w-full h-full dark:bg-blue-800 py-1 outline-none text-gray-100 text-base font-semibold">
                <h1 onClick={handleSubmit} className='w-full h-full'  >ফর্ম সম্পন্ন করুন </h1>
              </div>
          </div>
         </div>
      </div>
     </form>
    </div>


  {sendDataSucc ?  <div className={ `absolute ${sendDataSucc ?"mt-5" :'mt-[-100]'} top-2 left-[35%]`} >
     <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-start gap-4">
        <span className="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"  />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900"> Form saved Page Close {rederectCoutn} </strong>
          <p className="mt-1 text-sm text-gray-700">Your product changes have been saved.</p>
        </div>

        <button className="text-gray-500 transition hover:text-gray-600">
          <span className="sr-only">Dismiss popup</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        </div>
      </div>
          </div> :""}
        </div>
    </>
  )
}

export default page