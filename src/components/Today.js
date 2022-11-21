import React from 'react';
import { MainCityContext } from './Caller';
import { useContext } from 'react';

export const Today = () =>
{
    const [, data] = useContext(MainCityContext);  // Array destructuring 

    const tempList = [];
    const hoursList = [];
    for (const [key, value] of data.today.entries())
    {
        tempList.push(<li key={key}>{key}</li>);
        hoursList.push(<li key={key}>{value}</li>);
    }

    return (
        <div id="today_section">
            <h3 className="section_header">PLACEHOLDER FOR TODAY BOX</h3>
            <ul>
                { tempList }
                <li>
                    <img alt="segmented_line" src="www.lines.com/segmentedLine"></img>
                </li>
                { hoursList }
            </ul>
        </div>
    )
}