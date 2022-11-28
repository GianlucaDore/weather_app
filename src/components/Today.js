import React from 'react';
import { MainCityContext } from './Caller';
import { useContext } from 'react';
import "../css/Today.css";
// import segmentedline from '../timeline.svg';

export const Today = () =>
{
    const [, data] = useContext(MainCityContext);  // Array destructuring 

    const tempList = [];
    const hoursList = [];
    for (const [key, value] of data.today.entries())
    {
        tempList.push(<li className="temp_hour_list_entries" key={key}><h3>{key}</h3></li>);
        hoursList.push(<li className="temp_hour_list_entries" key={key}><h3>{value}°C</h3></li>);
    }

    return (
        <div id="today_box">
            <h2 className="section_header">Today</h2>
            <div id="today_data">
                <ul className='today_temp_hour_list'>
                    { tempList }
                </ul>
                <img id="segmented_line" alt="segmented_line" src="https://i.ibb.co/6JN2syH/segmented-line.png" height="225px"/>
                <ul className='today_temp_hour_list'>
                    { hoursList }
                </ul>
            </div>
        </div>
    )
}