import React from 'react';
import { useState } from 'react';

export const MainCity = (props) =>
{
    const [weekMonthSwitch, setWeekMonthSwitch] = useState("Week");  // This component decides, through state, which box is currently displayed between week and month.

    return (
        <div>
            <MainCityBox />
            <Today />
            <WeekMonthBox switcher = { weekMonthSwitch } />
        </div>
    );
        
}