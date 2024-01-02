'use client'
import React, { useEffect, useState } from 'react';
import {TeacherCarentStatus} from '../Data/ClassName';



function Oneoptionform(props) {
    const OptionData =props.OptionData
    const UpcomingData = props.UpcomingData


  const [SelectedOption, setSelectedOption] = useState('');

  // FORM VALIDATION IF WRONG
  const [PlaceselecOption, setPlaceselecOption] =useState(false)


  const HandleSlectedOption = (e) => {
    setSelectedOption(e.target.value)
  };


  useEffect(() => {
    if(PlaceselecOption == OptionData[0].ReadingDay){

        setPlaceselecOption(true)

    }
    else{
        setPlaceselecOption(false)
    }
  }, [SelectedOption]);

  UpcomingData(SelectedOption)



  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="h-[45px] bg-white dark:bg-gray-800 relative rounded flex items-center group border-[3px] transition-all duration-300 border-gray-700 hover:border-blue-500">
        <select
          className="w-full h-full dark:bg-slate-800"
          value={SelectedOption}
          onChange={HandleSlectedOption}
        >
          {OptionData.map((OptionData) => (
            <option value={OptionData.ReadingDay} key={OptionData.ReadingDay}>
              {OptionData.ReadingDay} দিন
            </option>
          ))}
        </select>
      </div>
      {PlaceselecOption ? <p className='text-red-500'>আপনি এখন কি করেন</p>:""}     

    </div>
  );
}

export default Oneoptionform;
