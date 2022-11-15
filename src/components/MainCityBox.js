import React from 'react';
import { useContext } from 'react';
import { MainCityContext } from './Caller';
import { getWeekday, getMonth } from '../converters';

export const MainCityBox = () =>
{
    const data = useContext(MainCityContext);

    return (
        <div id="main_city_box">
            <h1>PLACEHOLDER FOR MAIN CITY BOX</h1>
            <h4>{ data.name }</h4>
            <p>{ getWeekday(data.time.getDay()) } { data.time.getDate() }, {getMonth(data.time.getMonth())} </p>
            <p>{ data.weather }: { data.weather_description }</p>
            <p>{ data.temperature }</p>
        </div>
    );
}