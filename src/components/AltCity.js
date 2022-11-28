import React from 'react';
import '../css/AltCity.css';


import { getWeekday, getMonth } from '../converters';

export const AltCity = (props) =>
{
    return (
        <div className='alternate_city'>
            <table className='alternate_city_table'>
                <tbody>
                    <tr className='alternate-city-tablerow'>
                        <td className='alternate_city_tabledata'>
                           <div id="alt_city_data_cell">
                            <h2 className='alternate_city_name'>{ props.data.name }</h2>
                            <p className='alternate_city_date'>{ getWeekday(props.data.time.getDay()) } { props.data.time.getDate() },<br/> {getMonth(props.data.time.getMonth())} </p>
                            <p className='alternate_city_time'>{ props.data.time.getHours() }:{ (props.data.time.getMinutes()<10?'0':'') + props.data.time.getMinutes() }</p>
                           </div>
                        </td>
                        <td className='alternate_city_tabledata'>
                            <img className='alternate_city_weather_icon' src={"http://openweathermap.org/img/wn/" + props.data.icon + ".png"} alt="Current Weather Icon" />
                        </td>
                        <td className='alternate_city_tabledata'>
                            <h1>{ props.data.temperature }°C</h1>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}