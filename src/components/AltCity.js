import React from 'react';

export const AltCity = (props) =>
{
    return (
        <div>
            <ul>
                <li>
                    <h4>{ props.cityName }</h4>
                    <p >{ props.weekDay} {props.dayNumber},<br />{props.month}</p>
                    <p>{ props.time }</p>
                </li>
                <li>
                </li>
                <li>
                    <h2>{ props.temperature }</h2>
                </li>
            </ul>
        </div>
    )
}