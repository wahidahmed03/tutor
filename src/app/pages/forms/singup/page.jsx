'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import {IoMdPerson, IoIosMail, IoIosFingerPrint,IoMdLogIn,IoLogoGoogleplus,IoLogoFacebook,IoLogoWindows,IoMdFolder } from "react-icons/io";
import Link from 'next/link'


// IMPORT FIRE BASE FIE
import app from '@/app/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { getFirestore ,doc, setDoc  } from "firebase/firestore";
import { useRouter } from 'next/navigation'


// LOGIN BY GOOGLE
import {signInWithPopup, GoogleAuthProvider,FacebookAuthProvider, OAuthProvider  } from "firebase/auth";
const Googleprovider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider()
const MicrosoftProvider = new OAuthProvider('microsoft.com');

//

export default function Home() {

// USE START
  const [Name, setName] = useState()
  const [Email, setEmail] = useState()
  const [Password, setPassword ] =useState()
  const[ProfileImg, setProfileImg] =useState()
  const [ProfileImgUrl, setProfileImgUrl] = useState('')
  const router = useRouter()



/// HANDLE SINGUP IN WITH EMAIL AND PASSWORD
  const handleSingUpWithEmail =(e)=>{
    e.preventDefault();  // Details from
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        UploadProfileImg()
      })
      .catch((error) => {
      })
      
    }


  const UploadProfileImg = ()=>{
    const storage = getStorage();
    const storageRef = ref(storage, 'img/'+ProfileImg?.name);
    uploadBytes(storageRef, ProfileImg).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      }).then(resp =>{
      getDownloadURL(storageRef).then((url)=> {
      setProfileImgUrl(url)
      console.log(url)
      })})
  }


  useEffect(()=>{
    if(ProfileImgUrl){
      UserInfoUpdate()
    }
  },[ProfileImgUrl])


  const  UserInfoUpdate = ()=>{
      const db = getFirestore(app);
      setDoc(doc(db, "user", Email ), {
        Name: Name,
        Email: Email,
        ImgUrl : ProfileImgUrl
    });
    ProfileComplite(Email)
    router.push('/')
  }


  // LOGIN BY GOOGLE
  const LoginByGoogle=()=>{
    const auth = getAuth();
    signInWithPopup(auth, Googleprovider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    ProfileComplite(user.email)
    router.push('/')
  }).catch((error) => {
  })
}

  // LOGIN BY FACEBOOK
  const LoginByFacebook = () =>{
    const auth = getAuth();
    signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      console.log(result)
      ProfileComplite(result.user.email)
     router.push('/')
    }).catch((error) => {
    })
  }

    // LOGIN BY FACEBOOK
    const LoginBymicrosoft = () =>{
      const auth = getAuth();
      signInWithPopup(auth, MicrosoftProvider)
      .then((result) => {
        console.log(result)
        ProfileComplite(result.user.email)
       router.push('/')
      }).catch((error) => {
      })
    }

    const ProfileComplite =(email)=>{
      const db = getFirestore(app);
      setDoc(doc(db, "/user/ProfileInfo/CompliteProfile", email ), {
        CompliteProfile: false,
    });
    }

  return (
    <>
     <div className=" dark:bg-slate-800 w-screen pb-10 lg:pb-0  lg:h-screen">
     <div className="flex min-h-full flex-1 flex-col justify-center items-center">
        <div className="my-10">
          <p className=' text-xl font-semibold'>SING UP AND FILLUP ALL DETAILS</p>
       </div>

        <div className="">
          <form className="space-y-2" action="#" method="POST">
             {/** SING IN NAME**/}
            <div className="">
              {/* <label className='ml-1 text-base'>Name</label> */}
              <div className="w-[300px] sm:w-[400px] h-[45px] bg-white relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-300 hover:border-blue-500">
                <IoMdPerson className='text-gray-400 mx-[3px] group' size={25} />
                <input type="text" placeholder='WRITE YOUR NAME' onChange={(e)=>setName(e.target.value)} required className='group py-1 w-full outline-none text-gray-800 text-base font-semibold' />
              </div>
            </div>
            {/** SINGIN MAIL**/}
            <div className="">
              {/* <label className='ml-1 text-base'>Email</label> */}
              <div className="w-[300px] sm:w-[400px] h-[45px] bg-white relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-300 hover:border-blue-500">
                <IoIosMail  className='text-gray-400 mx-[3px] group' size={25} />
                <input type="email" placeholder='Write your Mail'  onChange={(e)=>setEmail(e.target.value)} required className='py-1 w-full outline-none text-gray-800 text-lg font-semibold' />
              </div>
            </div>
            {/** SINGIN MAIL**/}
            <div className="">
              {/* <label className='ml-1 text-base'>Email</label> */}
              <div className="w-[300px] sm:w-[400px] h-[45px] bg-white relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-300 hover:border-blue-500">
                <IoIosFingerPrint   className='text-gray-400 mx-[3px] group' size={25} />
                <input type="password" placeholder='Write your Password'  onChange={(e)=>setPassword(e.target.value)} required className='py-1 w-full outline-none text-gray-800 text-lg font-semibold' />
              </div>
            </div>

            <div className="">
              {/* <label className='ml-1 text-base'>Email</label> */}
              <div className="w-[300px] sm:w-[400px] h-[45px] bg-white relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-300 hover:border-blue-500">
                <IoMdFolder    className='text-gray-400 mx-[3px] group' size={25} />
                <input type="file" onChange={(e)=>setProfileImg(e.target.files[0])} required  accept="image/*" className='py-1 w-full outline-none text-gray-800 text-lg font-semibold' />
              </div>
            </div>

            <div className="">
              {/* <label className='ml-1 text-base'>Email</label> */}
              <div className="relative  w-[300px] sm:w-[400px] h-[45px] dark:bg-blue-500 rounded flex items-center justify-center group border-[1px] transition-all duration-300">
                <IoMdLogIn    className='text-gray-100 cursor-pointer absolute left-[95px] md:left-[140px] group' size={25} />
                <input type="submit" className='py-1 cursor-pointer w-full  text-gray-100 text-lg font-semibold' onClick={handleSingUpWithEmail} />
              </div>
            </div>
          </form>
          <p className=' text-center my-2'>Or</p>
          <div className="">
            <div >
            </div>
            <div className='flex flex-col gap-2'>
            <button onClick={LoginByGoogle} className='w-[300px] sm:w-[400px] h-[45px] hover:dark:bg-blue-600  rounded flex items-center justify-center gap-2 group border-[1px]  transition-all duration-300 '>
              <IoLogoGoogleplus size={25} /><p className='text-xl'>Google</p>
            </button>
            <button onClick={LoginByFacebook} className='w-[300px] sm:w-[400px] h-[45px] hover:dark:bg-blue-600  rounded flex items-center justify-center gap-2 group border-[1px]  transition-all duration-300 '>
              <IoLogoFacebook  size={25} /><p className='text-xl'>Facebook</p>
            </button>
            <button onClick={LoginBymicrosoft} className='w-[300px] sm:w-[400px] h-[45px] hover:dark:bg-blue-600  rounded flex items-center justify-center gap-2 group border-[1px]  transition-all duration-300 '>
              <IoLogoWindows   size={25} /><p className='text-xl'>Microsoft</p>
            </button>
            </div>
          </div>
          <div className="mt-2">
              {/* <label className='ml-1 text-base'>Email</label> */}
              <div className="relative w-[300px] sm:w-[400px] h-[45px] dark:bg-blue-500 rounded flex items-center justify-center group border-[1px] transition-all duration-300">
                <IoMdLogIn    className='text-gray-100 cursor-pointer absolute left-[95px] md:left-[130px] group' size={25} />
                <Link href='/pages/forms/login' className='w-full h-full text-center py-2 text-xl'>SING-IN</Link>
              </div>
           </div>
        </div>
      </div>
     </div>
    </>
  )
}
