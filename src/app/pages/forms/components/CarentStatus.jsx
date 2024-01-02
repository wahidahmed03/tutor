'use client'
import React, { useEffect, useState } from 'react';
import {TeacherCarentStatus} from '../Data/ClassName';



function CarentStatus({ UpcomingData }) {
  const [TecherStatus, setTecherStatus] = useState('');



  // FORM VALIDATION IF WRONG
  const [PlaceAceptedClassSected, setPlaceAceptedClassSected] =useState(false)


  const selectClassHandleEducationLevelClassChange = (e) => {
    setTecherStatus(e.target.value);
  };


  useEffect(() => {
    if(TecherStatus == 'আপনি এখন কি করেন'){
      setPlaceAceptedClassSected(true)
    }
    else{
      setPlaceAceptedClassSected(false)
    }
  }, [TecherStatus]);


  UpcomingData(TecherStatus)


  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
        <select
          className="w-full h-full dark:bg-slate-800"
          value={TecherStatus}
          onChange={selectClassHandleEducationLevelClassChange}
        >
          {TeacherCarentStatus.map((CarentStatus) => (
            <option value={CarentStatus.CarentStatus} key={CarentStatus.CarentStatus}>
              {CarentStatus.CarentStatus}
            </option>
          ))}
        </select>
      </div>
      {PlaceAceptedClassSected ? <p className='text-red-500'>আপনি এখন কি করেন</p>:""}     

    </div>
  );
}

export default CarentStatus;
