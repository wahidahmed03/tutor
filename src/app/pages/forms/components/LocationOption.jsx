'use client'
import React, { useEffect, useState } from 'react';
import {bddepartment, chattogramZilla,dhakaAllZila,rajshahizilla,khulnaZilla,shyletZilla,borishalZilla,rongpurZilla,moymonsingZila,dhakaUpzilla,chogramUpzilla,noakhaliUpzilla} from '../Data/BdLocationPlace'

//////////////////////////////////////////////////
const bddepartments  =bddepartment;        ///////
const chattogramZillas =chattogramZilla;   ///////
const dhakaAllZilas =dhakaAllZila          ///////
const rajshahizillas = rajshahizilla       ///////
const khulnaZillas =khulnaZilla            ///////
const shyletZillas =shyletZilla            ///////
const borishalZillas= borishalZilla        ///////
const rongpurZillas=rongpurZilla           ///////
const moymonsingZilas=moymonsingZila       ///////
const dhakaUpzillas=dhakaUpzilla           ///////
const chogramUpzillas=chogramUpzilla       ///////
const noakhaliUpzillas=noakhaliUpzilla     ///////
//////////////////////////////////////////////////


function Option({UpcomingData}) {
  const [bddepartment, setbddepartment] = useState('');
  const [departmentZilla, setdepartmentZilla] = useState([]);

  const [selectedZilla, setSelectedZilla] = useState('');

  ////
  const [plsceSelectBdDeperment, setplsceSelectBdDeperment] = useState(false)
  const [placeSelectZila, setplaceSelectZila] = useState(false)

  const handleDepartmentChange = (e) => {
    setbddepartment(e.target.value);
  };

  const handleZillaChange = (e) => {
    setSelectedZilla(e.target.value);
  };

  useEffect(() => {
    switch (bddepartment) {
      case 'ঢাকা বিভাগ':
        setdepartmentZilla(dhakaAllZilas);
        break;
      case 'চট্টগ্রাম বিভাগ':
        setdepartmentZilla(chattogramZillas);
        break;
      case 'রাজশাহী বিভাগ':
        setdepartmentZilla(rajshahizillas);
        break;
      case 'খুলনা বিভাগ':
        setdepartmentZilla(khulnaZillas);
        break;
        case 'সিলেট বিভাগ':
          setdepartmentZilla(shyletZillas);
          break;
        case 'বরিশাল বিভাগ':
          setdepartmentZilla(borishalZillas);
          break;
        case 'রংপুর বিভাগ':
          setdepartmentZilla(rongpurZillas);
          break;
        case 'ময়মনসিংহ বিভাগ':
          setdepartmentZilla(moymonsingZilas);
          break;
        default:
          break;
    }
  }, [bddepartment]);

  const StudentLocation = [{"StudentDeperMent":bddepartment,"StudentZilla":selectedZilla}]

  useEffect(()=>{
    UpcomingData(StudentLocation)
    if(bddepartment == 'আপনার স্থায়ী বিভাগ নির্ধারণ করুন'){
      setplsceSelectBdDeperment(true)
      setplaceSelectZila(false)
    }
    else{
      setplsceSelectBdDeperment(false)
      if(departmentZilla == "আপনার জেলা নির্ধারণ করুন"){
        setplaceSelectZila(true)
      }
      else{
        setplaceSelectZila(false)
      }

    }
  },[StudentLocation,departmentZilla])

  return (
    <>
    <div className='flex flex-col gap-2'>
     <div className='h-[45px]  bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500'>
      <select className='w-full h-full dark:bg-slate-800' onChange={handleDepartmentChange}>
        {bddepartments.map((department) => (
              <option value={department.department} key={department.department}>
                {department.department}
              </option>
        ))}
      </select>
     </div>
     { plsceSelectBdDeperment? <p className='text-red-500'>আপনার বিভাগ নির্ধারণ করুন</p> :""}


      <div className='h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500'>
      <select className='w-full h-full dark:bg-slate-800' value={selectedZilla} onChange={handleZillaChange}>
        {departmentZilla.map((departmentZillaItem) => (
          <option value={departmentZillaItem.zilla} key={departmentZillaItem.zilla}>
            {departmentZillaItem.zilla}
          </option>
          ))}
      </select>
    </div>
    { placeSelectZila ? <p className='text-red-500'>আপনার জেলা নির্ধারণ করুন</p> :""}
    </div>
    </>
  );
}

export default Option;
