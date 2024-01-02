'use client'
import React, { useEffect, useState } from 'react';
import EducationClass from '../Data/ClassName';

const EducationGroup = EducationClass.EducationGroup;
const AcceptedEducationClass = EducationClass.AcceptedEducationClass;

function AcpedtedTeacherClassFled({ UpcomingData }) {
  const [EducationLevelClass, setEducationLevelClass] = useState([]);
  const [selectClass, setSelectedClass] = useState('');
  const [selectedTeacherGroup, setSelectedTeacherGroup] = useState('');
  const [showGroupField, setShowGroupField] = useState(false);


  // FORM VALIDATION IF WRONG
  const [PlaceAceptedClassSected, setPlaceAceptedClassSected] =useState(false)
  const [PlaceAceptedGroupSected, setPlaceAceptedGroupSected] =useState(false)

  const [AcpedtedTeacherGroup,setAcpedtedTeacherGroup] = useState('')


  const selectClassHandleEducationLevelClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const HandleEducationLevelGroupChange = (e) => {
    setSelectedTeacherGroup(e.target.value);
  };


  useEffect(() => {
    setEducationLevelClass(EducationGroup);
    setShowGroupField(['ক্লাস ইলেভেন', 'ক্লাস টুয়েলভ'].includes(selectClass));
    if(selectClass == 'আপনার যোগ্যতা নির্ধারণ করুন'){
      setPlaceAceptedClassSected(true)
    }
    else{
      setPlaceAceptedClassSected(false)
      if(selectClass == 'ক্লাস ইলেভেন' || selectClass == 'ক্লাস টুয়েলভ'){
        if(selectedTeacherGroup == "গ্রুপ"){
          setPlaceAceptedGroupSected(true)
        }
        else{
          setAcpedtedTeacherGroup(AcpedtedTeacherGroup)
        }
      }
      else{
        setPlaceAceptedGroupSected(false)
      }
    }
  }, [selectClass,selectedTeacherGroup]);


  const TeacherClassAndGroup = [{"teacherClass":selectClass,"teacherGroup":AcpedtedTeacherGroup}]
  UpcomingData(TeacherClassAndGroup)


  return (
    <div className="flex flex-row md:flex-row gap-2 w-full">
      <div className="h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
        <select
          className="w-full h-full dark:bg-slate-800"
          value={selectClass}
          onChange={selectClassHandleEducationLevelClassChange}
        >
          {AcceptedEducationClass.map((eduClass) => (
            <option value={eduClass.class} key={eduClass.class}>
              {eduClass.class}
            </option>
          ))}
        </select>
      </div>
      {PlaceAceptedClassSected ? <p className='text-red-500'>আপনার যোগ্যতা নির্ধারণ করুন</p>:""}     

      {showGroupField && (
        <div className="h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
          <select
            className="w-full h-full dark:bg-slate-800"
            value={selectedTeacherGroup}
            onChange={HandleEducationLevelGroupChange}
          >
            {EducationLevelClass.map((eduGroup) => (
              <option value={eduGroup.class} key={eduGroup.class}>
                {eduGroup.class}
              </option>
            ))}
          </select>
        </div>)
      }
       {PlaceAceptedGroupSected ? <p className='text-red-500'>আপনার গ্রুপ নির্ধারণ করুন</p>:""} 
    
    </div>
  );
}

export default AcpedtedTeacherClassFled;
