import React from 'react';
import { useState } from 'react';
import { WeekMonthBox } from './WeekMonthBox';
import "../css/WeekMonthWrapper.css"

export const WeekMonthWrapper = () =>
{
    const [activeBox, setActiveBox] = useState({ 
        mode: "Week",
        buttonWeek: "week_month_button_active",
        buttonMonth: "week_month_button_inactive"
    });


    const changeState = (param) =>
    {
        setActiveBox((prevState) => {

            if (prevState.mode !== param)
            {   // If the state has to change, we must swap the status (active/inactive) of the two buttons. 
                return ({  
                    mode: param,
                    buttonWeek: prevState.buttonMonth,
                    buttonMonth: prevState.buttonWeek
                })
            }
            else
                return prevState;  // If the user clicks two or more times on the same button.
        });
    }  

    return (
        <div id="week_month_box">
            <div id="week_month_buttons">
                <button className={activeBox.buttonWeek} onClick={ () => changeState("Week") }><h2>This week</h2></button>
                <button className={activeBox.buttonMonth} onClick={ () => changeState("Month") }><h2>This month</h2></button>
            </div>
            <div id="week_month_tables">
                <WeekMonthBox mode={activeBox.mode}/>
            </div>
        </div>
    );
    
}