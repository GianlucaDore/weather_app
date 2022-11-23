import React from 'react';
import { useState } from 'react';
import { MainCityContext } from './Caller';
import { WeekMonthBox } from './WeekMonthBox';
import "../css/WeekMonthWrapper.css"

export const WeekMonthWrapper = () =>
{
    const [activeBox, setActiveBox] = useState("Week");

    const changeState = (param) =>
    {
        setActiveBox(param);  // setState does not update state if the updated state is going to be the same as what it currently is.
        return;
    }

    return (
        <div id="week_month_box">
            <div id="week_month_buttons">
                <button onClick={ () => changeState("Week") }>This week</button>
                <button onClick={ () => changeState("Month") }>This month</button>
            </div>
            <WeekMonthBox mode={activeBox}/>
        </div>
    );
    
}