import React from 'react';
import { MainCityBox } from './MainCityBox';
import { Today } from './Today';
import { WeekMonthWrapper } from './WeekMonthWrapper';

export const MainCity = (props) =>
{
    return (
        <div>
            <MainCityBox />
            <Today />
            <WeekMonthWrapper />
        </div>
    );
        
}