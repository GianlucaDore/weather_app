import React from 'react';
import { MainCityContext } from './Caller';
import { useContext } from 'react';
import "../css/Today.css"

export const Today = () =>
{
    const [, data] = useContext(MainCityContext);  // Array destructuring 

    const tempList = [];
    const hoursList = [];
    for (const [key, value] of data.today.entries())
    {
        tempList.push(<li key={key}>{key}</li>);
        hoursList.push(<li key={key}>{value}</li>);
    }

    return (
        <div id="today_box">
            <h3 className="section_header">Today</h3>
            <ul className='today_temp_hour_list'>
                { tempList }
            </ul>
            <img id="segmented_line" alt="segmented_line" src="www.lines.com/segmentedLine"></img>
            <ul className='today_temp_hour_list'>
                { hoursList }
            </ul>
        </div>
    )
}