'use client'
import React, { useEffect, useState } from 'react'

/// IMPORT ICON
import { IoIosPerson,IoIosCloseCircleOutline } from "react-icons/io";
import {IoBrushOutline} from "react-icons/io5";

///
import {createToken} from '../components/utilitis'

/// FIREBASE
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '@/app/firebase'
import { doc, setDoc,getFirestore,getDoc } from "firebase/firestore"; 
const db = getFirestore(app);

// import { doc, getDoc,getFirestore } from "firebase/firestore";
// const db = getFirestore(app);


//
import { useRouter } from 'next/navigation'



// IMPORT COMPONETS
import InputSubjectName from '../components/InputSubjectName'
import AcpedtedTeacherClassFled from '../components/AcpedtedTeacherClassFled'
import ClassOption from '../components/ClassOption'
import Option from '../components/LocationOption';
import Loding from '../../../components/Lodingpage'

function page() {
    const [TecherName,setTecherName] = useState()
    const [admissionDetails,setadmissionDetails] = useState()
    const [ReadInterrestTeacherSubject,setReadInterrestTeacherSubject] =useState()
    const [FormTeacherClass,setFormTeacherClass] = useState()
    const [FormTeacherGroup,setFormTeacherGroup]=useState()
    const [admissionTeacherSallary,setadmissionTeacherSallary] = useState()
    const [admissionOnerName, setadmissionOnerName] = useState()
    const [admissionOnerNameEnglish,setadmissionOnerNameEnglish] = useState()
    const [admissionOnerDetails,setadmissionOnerDetails] = useState(" ")
    const [StudentClassLevel,setStudentClassLevel]=useState()
    const [StudentClass,setStudentClass]= useState()
    const [StudentClassGroup,setStudentClassGroup] = useState()
    const [TeacherBdDeperment,setTeacherBdDeperment] =useState()
    const [TeacherBdZill,setTeacherBdZill] = useState()

    const [UserEmail,setUserEmail] = useState()
    const [unicId,setunicId]=useState()
    const [notification,setnotification] =useState()
    const [loding, setloding] = useState(false)
    const [sendDataSuss,setsendDataSuss] =useState(false)

    const[ProfileImgfromdb,setProfileImgfromdb] =useState('')
    const [ProfileImgfromgb , setProfileImgfromgb] = useState()
    const imgurl = ProfileImgfromgb || ProfileImgfromdb
    // const admissionOnerDetailses = admissionOnerDetails ||' '
    
    
    const router = useRouter()

    
    
    const UpcomeTexherSubjectData = (data) =>{
        setReadInterrestTeacherSubject(data)
    }
    const UpcomingTeacherClass = (data) => {
      setFormTeacherClass(data[0].teacherClass)
      setFormTeacherGroup(data[0].teacherGroup)
    };
    const UpComingStudentClassDEtails =(data)=>{
        setStudentClassLevel(data[0].StudentClassLevel)
        setStudentClass(data[0].StudentClass)
        setStudentClassGroup(data[0].StudentClassGroup)
    }
    const UpComingTeacherLocation =(data)=>{
        setTeacherBdDeperment(data[0].StudentDeperMent)
        setTeacherBdZill(data[0].StudentZilla)
      }

      // GANERATE ID FOR IDENTIFY



    const HandleFormSubmit=()=>{
        if(TecherName){
            setnotification(false)
            if(admissionDetails){
                setnotification(false)
                if(ReadInterrestTeacherSubject){
                    setnotification(false)
                    if(FormTeacherClass){
                        setnotification(false)
                        if(admissionTeacherSallary){
                            setnotification(false)
                            if(admissionOnerName){
                                setnotification(false)
                                if(StudentClassLevel){
                                    setnotification(false)
                                    if(StudentClass){
                                        setnotification(false)
                                        if(TeacherBdDeperment){
                                            setnotification(false)
                                            if(TeacherBdZill){
                                                if(unicId){
                                                    setnotification(false)
                                                    if(imgurl){
                                                        setloding(true)
                                                        setnotification(false)
                                                        SendWnerIdToFirebase()
                                                        SendDataToFirebase()
                                                    }
                                                    else{
                                                        console.log("imgurl")
                                                    }
                                                }
                                                else{
                                                    console.log("unicId")
                                                }
                                            }
                                            else{
                                                setnotification("আপনার স্থায়ী জেলা নির্ধারণ করুন")
                                            }
                                        }
                                        else{
                                            setnotification('আপনার স্থায়ী বিভাগ নির্ধারণ করুন')
                                        }
                                    }
                                    else{
                                        setnotification('কোন ক্লাস তা নির্ধারণ করুন')
                                    }
                                }
                                else{
                                    setnotification('আপনার সন্তান কোন মাধ্যমমে তা নির্ধারণ করুন')
                                }
                            }
                            else{
                                setnotification('আপনার নাম লিখুন')
                            }
                        }
                        else{
                            setnotification("আপনি কত বেতন দেবেন তা লিখুন")
                        }
                    }
                    else{
                        setnotification('যে ক্লাসের শিক্ষক প্রয়োজন তা নির্ধারণ করুন')
                    }
                }
                else{
                    setnotification('কোন কোন  বিষয়ে শিক্ষক প্রয়জোন তা লিখুন')
                }
            }
            else{
                setnotification('বিস্তারিত লিখুন')
            }
        }else{
            setnotification('আপনার নাম লিখুন')
        }
    }

    /// GANARATE UNIC ID
    useEffect(()=>{
        if(admissionOnerNameEnglish){
            const makeUnicId = admissionOnerNameEnglish.replace(/\s/g, "")+createToken(6).toLocaleLowerCase();
            setunicId(makeUnicId)
        }
    },[admissionOnerNameEnglish])


    ///   CHEACK USER IS LOGIN
    useEffect(()=>{
        const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserEmail(user.email)
        } else {
        router.push('/')
        }
        });
    },[]) 
    

    //// GET PROFILE IMH
    useEffect(()=>{
        if(UserEmail){
            profileData()
        }
    },[UserEmail])
    const profileData = async()=>{
        const docRef = doc(db, "user", UserEmail);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        // setName(docSnap.data().Name)
        setProfileImgfromdb(docSnap.data().ImgUrl)
      } else {
      }
    }



    

    

    const   SendWnerIdToFirebase = async ()=>{
        await setDoc(doc(db, `/teacher/teacheradmisionwner/admissionwar/`, UserEmail ), {
            'admissionwarid':unicId,
            "UserEmail":UserEmail
      })
      }

      const   SendDataToFirebase = async ()=>{
        await setDoc(doc(db, `/teacher/teacheradmission/admission`, unicId), {
          Title:TecherName,
          details:admissionDetails,
          subject:ReadInterrestTeacherSubject,
          TeacherClass:FormTeacherClass,
          TeacherGroup :FormTeacherGroup,
          TeacherSallary:admissionTeacherSallary,
          admissionOnerName:admissionOnerName,
          admissionOnerDetails:admissionOnerDetails,
          StudentClassLevel:StudentClassLevel,
          StudentClass:StudentClass,
          StudentClassGroup:StudentClassGroup,
          TeacherBdDeperment:TeacherBdDeperment,
          TeacherBdZill:TeacherBdZill,
          admissionId:unicId,
          imgurl:imgurl,
      })
      setsendDataSuss(true)
      }

      useEffect(()=>{
        if(sendDataSuss){
            router.push('/')
        }
      },[sendDataSuss])





  return (
 <>
  <div className=" relative pb-4 flex">
    <div className="w-[100%] py-10 dark:bg-slate-900 flex flex-col ">
      <p className=' text-lg text-center pt-[45px] p-1'>আপনার কি এক জন  শিক্ষক প্রয়োজন ?</p>
      <form>
        <div className="lg:p-[20px] lg:flex justify-center  py-8">
          <div className="w-full lg:w-[50%] flex flex-col items-center justify-center gap-2 pl-0 xl:pl-32 ">

            {/**আপনার নাম লিখুন **/} 
            <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <IoIosPerson className='text-gray-400 mx-[3px] group' size={25} />
                <input type="text" onChange={(e)=>setTecherName(e.target.value)} placeholder='আপনার নাম লিখুন ' required className='group capitalize dark:bg-gray-800 py-1 w-full outline-none text-gray-100 text-base font-semibold' />
            </div>

             {/**বিস্তারিত লিখুন**/} 
             <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[230px] bg-white dark:bg-gray-800 relative  rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
               <textarea type="text" onChange={(e)=>setadmissionDetails(e.target.value)} placeholder='বিস্তারিত লিখুন' required className='group px-2 dark:bg-gray-800 h-[200px] py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
             </div>

            {/**কোন কোন  বিষয়ে শিক্ষক প্রয়জোন তা লিখুন**/} 
            <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <InputSubjectName UpcomingData={UpcomeTexherSubjectData} />
            </div>

             {/**যে ক্লাসের শিক্ষক প্রয়োজন তা নির্ধারণ করুন**/} 
            <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px]">
                <AcpedtedTeacherClassFled UpcomingData={UpcomingTeacherClass} />
            </div>

            {/**আপনি কত বেতন দেবেন তা লিখুন**/} 
            <div className="w-[85%] md:w-[500px] lg:w-[90%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <input type="number"  onChange={(e)=>setadmissionTeacherSallary(e.target.value)} placeholder='আপনি কত বেতন দেবেন তা লিখুন' required className='group pl-1 dark:bg-gray-800 py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
            </div>
          </div>


        <div className="w-full lg:w-[50%] flex flex-col items-center mt-2 lg:mt-0  gap-2 pl-0">
            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <IoBrushOutline className='text-gray-400 mx-[3px] group' size={25} />
                <input type="text" onChange={(e)=>setadmissionOnerName(e.target.value)} placeholder='আপনার নাম লিখুন' required className='group dark:bg-gray-800 py-1 w-full outline-none text-gray-100 text-base font-semibold' />
            </div>
            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px] h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <IoBrushOutline className='text-gray-400 mx-[3px] group' size={25} />
                <input type="text" onChange={(e)=>setadmissionOnerNameEnglish(e.target.value)} placeholder='আপনার নাম লিখুন English' required className='group dark:bg-gray-800 py-1 w-full outline-none text-gray-100 text-base font-semibold' />
            </div>
            {/**আপনার সম্পকে বিস্তারিত লেখুন যদি মন চাই  **/} 
            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px] h-[150px] bg-white dark:bg-gray-800 relative  rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <textarea type="text" onChange={(e)=>setadmissionOnerDetails(e.target.value)} placeholder='আপনার সম্পকে বিস্তারিত লেখুন যদি মন চাই' required className='group px-2 dark:bg-gray-800 h-[140px] py-1 w-full outline-none dark:text-gray-100 text-base font-semibold' />
            </div>

            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px]">
                <ClassOption UpcomingData={UpComingStudentClassDEtails} />
            </div>

            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px]">
             <Option  UpcomingData={UpComingTeacherLocation} />
            </div>
            
            {notification? <div className='flex gap-1 items-center'><IoIosCloseCircleOutline className='text-red-600' /><p className='text-red-600' >{notification}</p></div>:
            ""} 

            <div className="w-[85%] md:w-[500px] lg:w-[95%] xl:w-[600px] h-[45px] text-center  bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
                <div className="group w-full h-full dark:bg-blue-800 py-1 outline-none text-gray-100 text-base font-semibold">
                    <h1 className='w-full h-full' onClick={HandleFormSubmit} >ফর্ম সম্পন্ন করুন </h1>
                </div>
            </div>
            </div>
        </div>
      </form>
    </div  >
        <div className=" absolute top-0 w-screen">
            {loding ? <Loding /> :"" }
        </div>
  </div>
 </>
  )
}

export default page