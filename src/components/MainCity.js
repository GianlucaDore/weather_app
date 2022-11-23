import React from 'react';
import { MainCityBox } from './MainCityBox';
import { Today } from './Today';
import { WeekMonthWrapper } from './WeekMonthWrapper';
import "../css/MainCity.css"

export const MainCity = (props) =>
{
    return (
        <div id="main_city">
            <MainCityBox />
            <div id="today_and_forecast">
                <Today />
                <WeekMonthWrapper />
            </div>
        </div>
    );
        
}