import React from "react";
import { MainCityContext } from "./Caller";
import { useContext } from "react";

export const WeekMonthBox = (props) =>
{
    const [, data] = useContext(MainCityContext);
    let boxToRender = null;

    switch (props.mode)
    {
        case "Week":
        {
            boxToRender = [];
            for (const [key, value] of data.this_week.entries())
            {
                boxToRender.push(<table className="week_table">
                                    <tbody>
                                        <tr>
                                            <td>{key}</td>
                                        </tr>
                                        <tr>
                                            <td>{value[0]}°C</td>
                                        </tr>
                                        <tr>
                                            <td>{value[1]}</td>
                                        </tr>
                                    </tbody>
                                 </table>);
            }

            return (
                boxToRender.map((table) => {return table;}) 
            );
        }

        case "Month":
        {
            boxToRender = [
                <div id="month_box">
                    <div id="text_image_month">
                        {<h6>Date</h6>}
                        {<img src="image.co/currentweather" alt="weather icon"></img>}
                    </div>
                    <div id="text_details_month">
                        <h6>Month temp</h6>
                        <p>Weather month description</p>
                        <p>The high will be temp, the low will be temp</p>
                        <p>Humidity</p>
                        <p>UV</p>
                        <p>Dew point</p>
                    </div>
                </div>
            ];

            return (
                boxToRender.map((div) => {return div;})
            );
        }
        
        default :
            return null;
    }


 
}