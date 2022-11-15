import React from 'react';

export const Today = () =>
{
    return (
        <div id="today_section">
            <p className="section_header">Today</p>
            <h3>PLACEHOLDER FOR TODAY BOX</h3>
            <ul>
                <li>
                    ... Today's forecasted temp values ...
                </li>
                <li>
                    <img alt="segmented_line" src="www.lines.com/segmentedLine"></img>
                </li>
                <li>
                    ... Today's hours associated to temp values ...
                </li>
            </ul>
        </div>
    )
}