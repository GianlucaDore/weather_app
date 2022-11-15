import React from 'react';
import { getWeekday, getMonth } from '../converters';

export const AltCity = (props) =>
{
    return (
        <div>
            <ul>
                <li>
                    <h3>PLACEHOLDER FOR ALTERNATIVE CITY</h3>
                    <h4>{ props.data.name }</h4>
                    <p>{ getWeekday(props.data.time.getDay()) } { props.data.time.getDate() }, {getMonth(props.data.time.getMonth())} </p>
                    <p>{ props.data.time.getHours() }:{ (props.data.time.getMinutes()<10?'0':'') + props.data.time.getMinutes() }</p>
                </li>
                <li>
                </li>
                <li>
                    <h2>{ props.data.temperature }</h2>
                </li>
            </ul>
        </div>
    )
}