'use client'
import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

function InputSubjectName({UpcomingData}) {

    const [subjectData, setSubjectData] = useState([]);
    const [newSubjectInput, setNewSubjectInput] = useState('');
    const [AgigSubjectWrite, setAgigSubjectWrite] =useState('')
  
    const handleKeyPress = (e) => {

      if (e.key === 'Enter') {
        setAgigSubjectWrite(false)
        let tag = e.target.value.trim().toLowerCase();
        if (tag !== '' && !subjectData.includes(tag)) {
          setSubjectData((prevSubjects) => [...prevSubjects, tag]);
          setNewSubjectInput(''); // Clear the input
        }
        else{
            setAgigSubjectWrite(tag)
        }
      }
    };
  
    const handleDeleteTag = (index) => {
      const updatedSubjects = [...subjectData];
      updatedSubjects.splice(index, 1);
      setSubjectData(updatedSubjects);
      setNewSubjectInput('');
    };

    UpcomingData(subjectData)
  
    return (
      <>
      <div className='flex flex-col'>
        <div className="w-full  flex flex-wrap items-center gap-1 p-2 py-3">
          {subjectData.map((subject, index) => (
            <p key={subject} className='bg-slate-600 p-1 rounded-[2px] flex items-center mt-[1px] gap-1' onClick={() => handleDeleteTag(index)}>
              {subject} <IoMdCloseCircle />
            </p>
          ))}
          <input
            className=' h-full w-[250px] sm:w-[350px] bg-slate-800 outline-none p-1 dark:text-gray-100 text-base font-semibold'
            placeholder='কোন কোন  বিষয়ে শিক্ষক  তা লিখুন'
            onKeyPress={handleKeyPress}
            value={newSubjectInput}
            onChange={(e) => setNewSubjectInput(e.target.value)}
          />
        </div>
        {AgigSubjectWrite ? <p className=' text-red-400 font-semibold'>Once Wrtten {AgigSubjectWrite}, Place Write Another Subject </p> :""}
    </div>
      </>
    );
  }
  
  export default InputSubjectName;