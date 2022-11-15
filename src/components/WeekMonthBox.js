import React from 'react';

export const WeekMonthBox = (props) =>
{
    if ( props.switcher === "Week")
    {
        return (
            <div id="this_week_section">
                
            </div>
        )
    }

    else
    {
        return (
            <div id="this_month_section">

            </div>
        )
    }
    
}