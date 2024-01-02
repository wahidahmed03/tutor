"use client"
import React, { useEffect, useState } from 'react'
// NEXT JS LINK
import Link from 'next/link'
import Image from 'next/image';
import logo from './img/logos.png'


// IMPORT ICON
import {IoIosNotificationsOutline,IoMdBarcode,IoIosAddCircleOutline,IoIosBook ,IoMdPersonAdd,IoMdPerson,IoMdStats,IoMdText,IoIosMusicalNote , IoIosLogOut,IoIosMenu,IoIosContact, IoIosContacts      } from "react-icons/io";
///  IMPORT FIREBASE
import FirebaseApp from '../firebase'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc,getFirestore } from "firebase/firestore";
const db = getFirestore(FirebaseApp);









function Header() {
  const [login, setlogin]= useState(false)
  const [ShowNotifications, setShowNotifications] = useState(false)
  const [ShowSideProfile, setShowSideProfile] = useState(false)
  const [user,setuser] = useState([])
  const [isMobileManu, setisMobileManu] = useState(false)


  /// INFORMATON FOR INFO
  const[Name,setName] =useState('')
  const[Email,setEmail] =useState('')
  const[ProfileImg,setProfileImg] =useState('')
  const [IsProfileComplite, setIsProfileComplite] = useState()



  /// CALL FIREBASE FOR USER DATA
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setlogin(true)
        getUserData(user)
        setName(user.displayName)
        // ...
      } else {
        console.log('user sing out')
      }
    });
  },[])

  const getUserData =(user)=>{
    setName(user.displayName)
    setEmail(user.email)
    setProfileImg(user.photoURL)
    }

    // HANDLE LOGOUT
    const HandlelogOut = ()=>{
      const auth = getAuth();
      signOut(auth).then(() => {
        setlogin(false)
        setShowSideProfile(false)
      }).catch((error) => {
      });
    }

    /// fetch data

    useEffect(()=>{
      if(login){
        UserProfileData()
      }
    },[Email])
    const UserProfileData = async ()=>{
      const docRef = doc(db, "user", Email);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        setName(docSnap.data().Name)
        setProfileImg(docSnap.data().ImgUrl)
        ProfileComplite()
      } else {

      }
    }

    const ProfileComplite = async()=>{
      const docRef = doc(db, "/user/ProfileInfo/CompliteProfile", Email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsProfileComplite(docSnap.data().CompliteProfile)
      } else {

      }
    }


  return (
    <>
    <div className=" w-screen relative">
      <div className="h-[60px] bg-gray-800 w-screen px-8 flex items-center justify-between text-lg font-semibold ">
        <div className=" flex gap-4 items-center">
           <Link href={'/'} ><Image src={logo}  className='w-[60px] h-[60px]' /></Link>
          <div className="sm:flex gap-2 mx-1 none hidden text-center text-base ">
            <Link href='/pages/tutor/exploretutor' className='px-2 py-3  w-[150px]  rounded transition-all duration-500 dark:hover:bg-gray-900 hover:border-0'>FIND TUTOR</Link>
            <Link href='/pages/admission/exploreadmission' className='px-2 py-3   w-[150px] text-center rounded transition-all duration-500 dark:hover:bg-gray-900 hover:border-0'>FIND STUDENT</Link>
          </div>
        </div>

        {/**** LOGIN DETAILS IF USER LOGIN***/}
      {login ?  <div className="hidden sm:flex items-center gap-5">
          <Link href={'/pages/forms/becometeacher'} className={`relative group ${IsProfileComplite ? 'opacity-0' :"opacity-100" } opacity-0 cursor-pointer `}>
            <IoIosBook   size={30} />
            <div className=" absolute w-[100px] h-[20px] bg-slate-500 text-center text-sm  mt-2 z-10 right-[-30px] opacity-0 group-hover:opacity-100 transition-all duration-300">Join Teacher</div>
          </Link>



        <Link href={'/pages/forms/teacheradmission'} className=" relative group cursor-pointer">
            <IoIosAddCircleOutline  size={30} />
            <div className=" absolute w-[100px] h-[20px] bg-slate-500 text-center text-sm  mt-2 z-10 right-[-30px] opacity-0 group-hover:opacity-100 transition-all duration-300">POST NIYOG</div>
          </Link >
          <div className=" relative group cursor-pointer" onClick={()=>{setShowNotifications(ShowNotifications? false : true),setShowSideProfile(false)}}>
            <IoIosNotificationsOutline size={35} />
            <div className=" absolute top-0 right-0 bg-red-600 w-5 h-5 rounded-full text-center text-sm">5</div>
            <div className=" absolute w-[100px] h-[20px] bg-slate-500 text-center text-sm  mt-2 z-[5] right-[-30px] opacity-0 group-hover:opacity-100 transition-all duration-300">POST NIYOG</div>
          </div>
          <Link href={'/pages/dashboard'} className=" relative group cursor-pointer">
            <IoMdBarcode size={30} />
            <div className=" absolute w-[100px] h-[20px] bg-slate-500 text-center z-10 right-[-30px] text-sm  mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">Dashbord</div>
          </Link>
          <div className="w-[50px] cursor-pointer h-[50px] rounded-full relative group " onClick={()=>{setShowSideProfile(ShowSideProfile?false:true),setShowNotifications(false)}}>
            <img src={ProfileImg} alt="" className='w-[45px] h-[45px] rounded-full ' />
            <div className=" absolute w-[130px] h-[20px] bg-slate-500 text-center z-10 right-[-30px] text-sm  mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">{Name}</div>
          </div>
        </div>: 
        <div className=" hidden sm:flex gap-2">
          <div className="w-[120px] h-[50px] flex justify-center text-center rounded-sm items-center gap-2 ">
            <Link href='/pages/forms/login' className='flex gap-3 items-center cursor-pointer'><IoMdPerson  /> <p>LOGIN</p></Link>
          </div>
          <div className="w-[120px] h-[50px] flex justify-center text-center rounded-sm items-center gap-2 cursor-pointer bg-gray-900">
            <Link href='/pages/forms/singup' className='flex gap-3 items-center cursor-pointer'><IoMdPersonAdd /> <p>SING UP</p></Link>
          </div>

        </div>   }
       <div className="w-[100px] h-full ml-16 sm:hidden flex justify-end items-center">
         <button onClick={()=>{setisMobileManu(isMobileManu? false :true)}} ><IoIosMenu size={35}  /></button>
       </div>



           {/**** PROFILE DETAILS IF USER LIGIN****/}
   {ShowSideProfile ? <div className="w-[250px] absolute top-16 left-2 h-[260px] dark:bg-slate-600 sm:ml-[500px] md:ml-[600px] lg:ml-[800px] xl:ml-[1100px] z-10 -mt-[12px] rounded transition-all duration-[1s]">
      <div className="w-full h-[60px] border-b-2 border-gray-800 flex items-center">
        <div className="w-[50px] h-[50px] ">
          <img src={ProfileImg} alt="" className='w-[50px] h-[50px] rounded-full pt-[1px] ml-1' />
        </div>
        <div className="ml-4">
          <h5 className=' text-xl'>{Name}</h5>
          <h6 className=' text-xs'>{Email}</h6>
        </div>
      </div>
      <div className="">
        <div className="w-full h-[35px] mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-2 gap-1">
          <IoMdPerson size={25} />
          <Link href=''>Profile</Link>
        </div>
        <div className="w-full h-[35px] mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-2 gap-1">
          <IoMdStats  size={25} />
          <Link href='/pages/dashboard'>DashBord</Link>
        </div>
        <div className="w-full h-[35px] mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-2 gap-1">
          <IoMdText  size={25} />
          <Link href=''>Massage</Link>
        </div>
        <div className="w-full h-[35px] mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-2 gap-1">
          <IoIosMusicalNote  size={25} />
          <Link href=''>Listen Prodcast</Link>
        </div>
        <div className="w-full h-[40px] border-t-2 mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-4 gap-1 cursor-pointer">
          <IoIosLogOut  size={25} />
          <Link href='/' onClick={HandlelogOut}>LogOut</Link>
        </div>
      </div>
    </div> :""}


      </div>





  {/* *** HANDLE MOTIFICATION****
{ShowNotifications ?  <div className=" absolutew-[320px] h-[400px] dark:bg-slate-600 ml-[1052px] z-10 -mt-4 rounded top-0 ">
      <div className="w-full h-[45px] bg-slate-800 p-2 flex items-center gap-4">
        <IoIosNotificationsOutline  size={30} />
        <p className=' text-2xl'>Notifications (1)</p>
      </div>
      <div className="w-full h-[55px] border-b-2 mt-1 p-2 flex items-center gap-4">
        <div className="W-[45PX] h-[45]">
          <IoIosNotificationsOutline  size={30} />
        </div>
        <p className=' text-lg leading-normal'>Please allow ads and let sponsors fund your surfing.</p>
      </div>
      <div className="w-full h-[55px] border-b-2 mt-1 p-2 flex items-center gap-4">
        <div className="W-[45PX] h-[45]">
          <IoIosNotificationsOutline  size={30} />
        </div>
        <p className=' text-lg leading-normal'>Please allow ads and let sponsors fund your surfing.</p>
      </div>
      <div className="w-full h-[55px] border-b-2 mt-1 p-2 flex items-center gap-4">
        <div className="W-[45PX] h-[45]">
          <IoIosNotificationsOutline  size={30} />
        </div>
        <p className=' text-lg leading-normal'>Please allow ads and let sponsors fund your surfing.</p>
      </div>
      <div className="w-full h-[55px] border-b-2 mt-1 p-2 flex items-center gap-4">
        <div className="W-[45PX] h-[45]">
          <IoIosNotificationsOutline  size={30} />
        </div>
        <p className=' text-lg leading-normal'>Please allow ads and let sponsors fund your surfing.</p>
      </div>
      <div className="w-full h-[55px] border-b-2 mt-1 p-2 flex items-center gap-4">
        <div className="W-[45PX] h-[45]">
          <IoIosNotificationsOutline  size={30} />
        </div>
        <p className=' text-lg leading-normal'>Please allow ads and let sponsors fund your surfing.</p>
      </div>
      <div className="w-full h-[45px] bg-slate-800 p-2 flex items-center gap-4 mt-4">
        <IoIosNotificationsOutline  size={30} />
      </div>
    </div> :""} */}
    </div>









    {/** MOBILE MANU**/}
    <div className={`w-full ${login ?'h-[350px]':'h-[205px]'} sm:hidden transition-all duration-1000 bg-slate-600 ${isMobileManu ? "mt-0" :'-mt-[500px]'}`}>
         <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoIosContact   size={30} />
            <Link href='' >Explore Teacher</Link>
          </div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoIosContacts   size={30} />
            <Link href='' >Explore Student</Link>
          </div>
  {login ? <div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoIosAddCircleOutline  size={30} />
            <Link href='' >POST TEACHER ADMISSION</Link>
          </div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoIosNotificationsOutline  size={30} />
            <Link href='' >Notifications</Link>
          </div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoMdBarcode  size={30} />
            <Link href='/pages/dashboard' >Dashbord</Link>
          </div>
          <div className="group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 " onClick={()=>{setShowSideProfile(ShowSideProfile?false:true)}}>
                <img src={ProfileImg} alt="" className='rounded-full w-[45px] h-[45px] ' />
                <Link href='' >{Name}</Link>
          </div>
          <div className="w-full h-[40px] border-t-2 mt-1 hover:bg-gray-700 transition-all duration-200 flex items-center pl-4 gap-1 cursor-pointer">
          <IoIosLogOut  size={25} />
          <Link href='/' onClick={HandlelogOut}>LogOut</Link>
        </div>
        </div>:
        <div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoMdPerson   size={30} />
            <Link href='/login' >LOGIN</Link>
          </div>
          <div className=" group cursor-pointer flex items-center py-1 px-1 gap-2 h-[50px] hover:bg-gray-800 transition-all duration-500 ">
            <IoMdPersonAdd   size={30} />
            <Link href='/singup' >SINGUP</Link>
          </div>
        </div>
        }
    </div>
    </>
  )
}

export default Header