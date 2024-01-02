import Image from 'next/image'
import Lodingpage from './components/Lodingpage'
import Teacher from './pages/tutor/exploretutor/page'
import Admission from './pages/admission/exploreadmission/page'
import { Suspense } from 'react';


export default function Home() {
  return (
    <>
    <Suspense fallback={<Lodingpage />}>
      <div className='flex justify-center gap-2 bg-slate-900 '>
          <Teacher />
          <Admission />
      </div>
    </Suspense>
    </>
  )
}
