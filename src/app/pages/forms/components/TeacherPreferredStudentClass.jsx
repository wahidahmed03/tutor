'use clien'
import React, { useState } from 'react'
import {TeacherPreferredStudentClass} from '../Data/ClassName'


function TeacherPreferredStudentClassCom({UpcomingData}) {
    const [SelectedClass, setSelectedClass] =useState([])
    const HandleSelectedClass =(e)=>{
     var updateSelectedClass =[...SelectedClass]
     if(e.target.checked){
        updateSelectedClass =[...SelectedClass,e.target.value ]
     }else{
        updateSelectedClass.splice(SelectedClass.indexOf(e.target.value),1)
     }
     setSelectedClass(updateSelectedClass)
    }

    UpcomingData(SelectedClass)
  return (
    <><div className="">
        <h6 className='px-3 py-4' >কোন কোন ক্লাসের ছাত্র পড়াতে চান ?</h6>
        <div className="w-full h-full px-4 py-5 bg-gray-800 relative rounded flex flex-wrap	 items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
            {TeacherPreferredStudentClass.map((classes, index) => (
            <div className="flex gap-2" key={index}>
                <input
                type="checkbox"
                value={classes}
                onChange={HandleSelectedClass}
                />
                <label htmlFor={`subject-${index}`}>{classes}</label><br />
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default TeacherPreferredStudentClassCom