'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosPerson,IoIosBookmarks,IoIosCreate,IoIosPeople,IoIosCheckmarkCircleOutline,IoMdContact } from "react-icons/io";
import { IoIosBriefcase,IoIosJournal ,IoIosPhonePortrait ,IoIosPaper,IoMdCash ,IoMdCheckmarkCircleOutline,IoIosBook,IoIosArrowRoundForward,IoMdPin,IoIosCopy ,    } from "react-icons/io";



//
import app from '@/app/firebase'
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
import { doc, getDoc} from "firebase/firestore"; 



function Page({params}) {
  const [CurrentStatusForTuition,setCurrentStatusForTuition]= useState('Available')

    const [teacherIdpath,setteacherId]=useState(params.slug)
    /// ALL DATA
    const [UpTeacherProfile,setUpTeacherProfile] = useState([])
    //// TEACHING SUBJECT
    const [Teaching, setTeaching] = useState([UpTeacherProfile.ReadInterrestTeacherSubject])
    const [TeacherInterstedMeduim, setTeacherInterstedMeduim] = useState(UpTeacherProfile.TeacherInterstedMeduim)
    const [TeacherIntersteClass, setTeacherIntersteClass] = useState(UpTeacherProfile.TeacherIntersteClass)

    

    const subject = ['bangla', 'english', 'math']
    const mediam = ['bangla mediam',"English Medium", "English Version", "Extra Curricular Activities"]



    useEffect(()=>{
        getteacherprofile()
    },[])



    useEffect(()=>{
      setTeaching(UpTeacherProfile.ReadInterrestTeacherSubject)
      setTeacherInterstedMeduim(UpTeacherProfile.TeacherInterstedMeduim)
      setTeacherIntersteClass(UpTeacherProfile.TeacherIntersteClass)
    },[UpTeacherProfile])


        const getteacherprofile = async ()=>{
            const ref = doc(db, "/teacher/teacherprofilepublic/teacher", teacherIdpath);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
              // Convert to City object
              const ProfileData = docSnap.data();
              // Use a City instance method
              setUpTeacherProfile(ProfileData)
            } else {
              console.log("No such document!");
            }
    }



    console.log(UpTeacherProfile);
    

    return (
      <div className='w-screen h-screen bg-slate-900 flex gap-2 p-5 flex-wrap justify-center items-center'>
        {/***/}
      <div className="w-[330px] h-[450px] bg-gray-800 rounded border-[4px] border-gray-700 hover:border-blue-800 transition-all duration-300">
      <div className="w-full h-full">
        <div className="w-full h-[150px] flex justify-center items-center ">
          <img src={UpTeacherProfile.ProfileImgUrl} alt=""  className='w-[100px] h-[100px] border-[3px] rounded border-gray-500'  />
        </div>
        <div className="px-3">
          <div className="flex gap-1 justify-center">
             <IoIosPerson size={25} className=' text-gray-100' />
              <h3 className='text-xl text-center uppercase text-gray-100 font-semibold '>{UpTeacherProfile.TecherName}</h3>
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
                <h3 className=' text-[12px] text-center font-semibold group-hover:text-blue-300'>{UpTeacherProfile.TeacherBdZill}</h3>
              </div>
          </div>  

          <div className="flex gap-1 justify-between group">
              <div className="flex gap-1">
                <IoIosBookmarks  size={17} className='group-hover:text-blue-300' />
                <h3 className=' text-[12px]  text-center  font-semibold '>Qualification</h3>
              </div>
              <div className="">
                <h3 className=' text-[12px] text-center font-semibold group-hover:text-blue-300'>{UpTeacherProfile.FormTeacherClass}</h3>
              </div>
          </div>  

          <div className="flex gap-1 justify-between group">
              <div className="flex gap-1 w-[150px]">
                <IoIosCreate   size={17} className='group-hover:text-blue-300' />
                <h3 className=' text-[12px]  text-center   font-semibold '>Teaching</h3>
              </div>
              {Teaching ? <div className=" flex gap-1">
                {Teaching.map((subject) => <h3 className='text-[12px] text-center group-hover:text-blue-300  font-semibold '>{subject}</h3> )}
              </div>:''}
          </div> 


          <div className="flex gap-1 justify-between group">
              <div className="flex gap-1">
                <IoIosPeople   size={17} className='group-hover:text-blue-300' />
                <h3 className=' text-[12px]  text-center  font-semibold  '>Current Status</h3>
              </div>
              <div className="">
                <h3 className=' text-[12px] text-center group-hover:text-blue-300  font-semibold '>{UpTeacherProfile.TeacherCarrentStatus}</h3>
              </div>
          </div> 

          <div className="flex gap-1 justify-between group">
            <div className="flex gap-1">
              <IoIosCheckmarkCircleOutline    size={17} className='group-hover:text-blue-500' />
              <h3 className=' text-[12px]  text-center  font-semibold '>Current Status for Tuition</h3>
            </div>
            <div className="">
              <h3 className=' text-[12px] text-center group-hover:text-blue-300  font-semibold '>{CurrentStatusForTuition}</h3>
            </div>
          </div> 
          <div className="flex w-full mt-2 items-center justify-center gap-2 group border-[1px] h-[40px] hover:h-[42px] rounded hover:bg-blue-900 transition-all duration-300 hover:border-[4px] hover:border-blue-600">
            <IoMdContact  size={20}  className='group-hover:text-blue-300'/>
            <Link href={`/pages/tutor/${UpTeacherProfile.teacherId}`} className='text-center group-hover:text-blue-300'>View Profile</Link>
          </div> 
        </div>
      </div>
    </div>

    {/***********************************/}

    <div className="w-[850px] h-[470px] relative px-4 py-4 bg-gray-800 capitalize rounded text-gray-300 border-[4px] border-gray-700 hover:border-blue-800 transition-all duration-300">
        <div className="">
            <div className="flex gap-1 items-center group border border-gray-600 p-[10px]">
                <h6>ঠিকানা</h6>
                <div className="flex gap-1 items-center">
                    <IoIosArrowRoundForward className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{UpTeacherProfile.TeacherBdDeperment}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoMdPin  size={22}  className=' group-hover:text-blue-400 transition-all duration-300'/><h6>{UpTeacherProfile.TeacherBdZill}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>কোয়ালিফিকেশন </h6>
                <div className="flex gap-1 items-center">
                    <IoIosBook  size={22} className=' group-hover:text-blue-400 transition-all duration-300' /><h6>{UpTeacherProfile.FormTeacherClass}</h6>
                </div>
                <div className="flex gap-1 items-center">
                    <IoIosBookmarks  className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{UpTeacherProfile.FormTeacherGroup}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>বর্তমানে  </h6>
                <div className="flex gap-1 items-center">
                    <IoIosBriefcase className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{UpTeacherProfile.TeacherCarrentStatus}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>যে সব বিষয় পড়ান</h6>
        {Teaching?  <div className="flex gap-1 items-center">
                    {Teaching.map(subject =><><IoIosCopy  className=' group-hover:text-blue-400 transition-all duration-300' size={18} /><h6>{subject}</h6></>)}
                </div>:''}
            </div>
               <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>যে সব মিডিয়াম পড়ান  </h6>
 {TeacherInterstedMeduim?  <div className="flex gap-1 items-center">
                    {TeacherInterstedMeduim.map(subject =><><IoIosJournal   className=' group-hover:text-blue-400 transition-all duration-300' size={18} /><h6>{subject}</h6></>)}
                </div> :""}
            </div> 
            <div className="flex gap-3 items-center group border border-gray-600 p-[10px]">
                <h6>যে সব ক্লাস পড়ান</h6>
    {TeacherIntersteClass? <div className="flex gap-1 items-center">
                    {TeacherIntersteClass.map(subject =><><IoIosPeople  className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{subject}</h6></>)}
                </div>:""}
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>পড়ান  </h6>
                <div className="flex gap-1 items-center">
                   <IoIosPaper    className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6> {UpTeacherProfile.teaccherReadingDay} দিন প্রতি সপ্তাহে</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>ফোন নম্বর </h6>
                <div className="flex gap-1 items-center">
                   <IoIosPhonePortrait   className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{UpTeacherProfile.TeacherPhoneNumber}</h6>
                </div>
            </div>
            <div className="flex gap-2 items-center group border border-gray-600 p-[10px]">
                <h6>বেতন </h6>
                <div className="flex gap-1 items-center">
                   <IoMdCash    className=' group-hover:text-blue-400 transition-all duration-300' size={22} /><h6>{UpTeacherProfile.TeacherPreferredSallary} টাকা  প্রতি মাস</h6>
                </div>
            </div>
        </div>
     </div>
      </div>
    );
}

export default Page;
