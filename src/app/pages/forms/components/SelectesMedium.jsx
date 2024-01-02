'use client'
import React, { useState } from 'react'
import {EducationMeduam} from '../Data/ClassName'

function SelectesMedium({UpcomingData}) {
  const [selectedMedium, setselectedMedium] =useState([])
    const handleselecMedium  = (e)=>{
    var upDateselectedMedium = [...selectedMedium]
    if(e.target.checked){
      upDateselectedMedium =[...selectedMedium, e.target.value]
    }
    else{
      upDateselectedMedium.splice(selectedMedium.indexOf(e.target.value),1)
    }
    setselectedMedium(upDateselectedMedium)
    }

    UpcomingData(selectedMedium)
  return (
  <> 
  <div className="w-full h-full px-4 py-3 bg-gray-800 relative rounded flex flex-wrap	 items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
    {EducationMeduam.map((subject, index) => (
      <div className="flex gap-2" key={index}>
        <input
          type="checkbox"
          value={subject}
          onChange={handleselecMedium}
        />
        <label htmlFor={`subject-${index}`}>{subject}</label><br />
      </div>
     ))}
  </div>
  </>
  )
}

export default SelectesMedium
