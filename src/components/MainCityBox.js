import React from 'react';
import { useContext } from 'react';
import { MainCityContext } from './Caller';
import { getWeekday, getMonth } from '../converters';

export const MainCityBox = () =>
{
    const [data, ] = useContext(MainCityContext);

    return (
        <div id="main_city_box">
            <div id={"torino_" + data.weather_description.replaceAll(' ', '_')}>
                <h2 className='main_city_details'>{ data.name }</h2>
                <p className='main_city_details'>{ getWeekday(data.time.getDay()) } { data.time.getDate() }, {getMonth(data.time.getMonth())}</p>
                <p className='main_city_details'>{ data.weather }: { data.weather_description }</p>
                <p className='main_city_details'>{ data.temperature }</p>
            </div>
        </div>
    );
}