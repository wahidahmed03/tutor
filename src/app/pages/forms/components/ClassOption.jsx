'use client'
import React, { useEffect, useState } from 'react';
import EducationClass from '../Data/ClassName'

const EducationLevels = EducationClass.EducationLevels

const PrimaryEducation=EducationClass.PrimaryEducation
const JuniorSecondarySchool=EducationClass.JuniorSecondarySchool
const SecondarySchool=EducationClass.SecondarySchool
const HigherSecondarySchool=EducationClass.HigherSecondarySchool
const EducationGroup = EducationClass.EducationGroup




function ClassOption({UpcomingData}) {
  //
  const [EducationLevelss, setEducationLevels] = useState('');
  const [selectClass, setSelectedClass] = useState('');
  const [SelectEducationGroup, setSelectEducationGroup] = useState('')

  ///
  const [EducationLevelClass, setEducationLevelClass] = useState([]);
  const [showGroupFled, setShowGroupFled] = useState(false)

  ///**/ VALIDATON FROM DATA
  //EDUCATION LEVEL
  const [PlaceSeletEducationMaddon, setPlaceSeletEducationMaddon] = useState(false)
  //EDUCATION CLASS
  const [PlaceSelecClass,setPlaceSelecClass]=useState(false)
  // EDUCATION GROUP
  const [PlaceSelecGroup,setPlaceSelecGroup]=useState(false)



  const HandleEducationLevelChange = (e) => {
    setEducationLevels(e.target.value);
  };

  const HandleEducationLevelClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
const HandleEducationLevelGroupChange =(e)=>{
  setSelectEducationGroup(e.target.value)
}

const StudentClassDEtails = [{"StudentClassLevel":EducationLevelss,"StudentClass":selectClass,"StudentClassGroup":SelectEducationGroup}]

// FORM DATA VALIDATION
useEffect(()=>{
  if(EducationLevelss=='আপনার সন্তান কোন মাধ্যমমে তা নির্ধারণ করুন'){
    setPlaceSeletEducationMaddon(true)
  }
  else{
    setPlaceSeletEducationMaddon(false)
    if(selectClass == "ক্লাস"){
      setPlaceSelecClass(true)
    }
    else{
      setPlaceSelecClass(false)
      if(SelectEducationGroup== "গ্রুপ"){
        setPlaceSelecGroup(true)
      }
      else{
        setPlaceSelecGroup(false)
        UpcomingData(StudentClassDEtails)
      }
    }
  }

},[StudentClassDEtails],selectClass,SelectEducationGroup)



  useEffect(() => {
    switch (EducationLevelss) {
      case 'প্রাথমিক শিক্ষা':
        setEducationLevelClass(PrimaryEducation)
        setShowGroupFled(false)
      break;
      case 'জুনিয়র সেকেন্ডারি স্কুল':
        setEducationLevelClass(JuniorSecondarySchool)
        setShowGroupFled(false)
      break;
      case 'সেকেন্ডারি স্কুল':
        setEducationLevelClass(SecondarySchool)
        setShowGroupFled(true)
        break;
      case 'উচ্চমাধ্যমিক স্কুল':
        setEducationLevelClass(HigherSecondarySchool)
        setShowGroupFled(true)
        break;
        default:
          break;
    }
  }, [EducationLevelss]);

  return (
    <>
    <div className='flex flex-col gap-2'>
     <div className=' h-[45px]  bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500'>
      <select className='w-full h-full dark:bg-slate-800' onChange={HandleEducationLevelChange} >
        {EducationLevels.map((EducationLevel) => (
              <option value={EducationLevel.EducationLevel} key={EducationLevel.EducationLevel}>
                {EducationLevel.EducationLevel}
              </option>
        ))}
      </select>
     </div>
     {PlaceSeletEducationMaddon ? <p className='text-red-500'>আপনার সন্তান কোন মাধ্যমমে তা নির্ধারণ করুন</p> :""}

    <div className='h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500'>
     <select className='w-full h-full dark:bg-slate-800' value={selectClass} onChange={HandleEducationLevelClassChange}  >
        {EducationLevelClass.map((EducationLevelClass) => (
          <option value={EducationLevelClass.class} key={EducationLevelClass.class}>
            {EducationLevelClass.class}
          </option>
          ))}
      </select>
    </div>
   {PlaceSelecClass ? <p className='text-red-500'>কোন ক্লাস তা নির্ধারণ করুন</p> :""}


{
showGroupFled ?<div className=' h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500'>
          <select className='w-full h-full dark:bg-slate-800' value={SelectEducationGroup} onChange={HandleEducationLevelGroupChange}>
            {EducationGroup.map((EducationLevelClass) => (
              <option value={EducationLevelClass.class} key={EducationLevelClass.class}>
                {EducationLevelClass.class}
              </option>
              ))}
          </select>
        </div> :""
}
{PlaceSelecGroup ? <p className='text-red-500'>কোন গ্রুপ তা নির্ধারণ করুন</p> :""}
    </div>
    </>
  );
}

export default ClassOption;