import React from "react";
import { MainCityContext } from "./Caller";
import { useContext } from "react";

export const WeekMonthBox = (props) =>
{
    const [, data] = useContext(MainCityContext);  // We ignore the first parameter returned
    let boxToRender = null;

    switch (props.mode)
    {
        case "Week":
        {
            boxToRender = [];
            for (const [key, value] of data.this_week.entries())
            {
                boxToRender.push(<table className="week_table" key={key}>
                                    <tbody>
                                        <tr className="week_table_row">
                                            <td className="table_data"><h4>{key}</h4></td>
                                        </tr>
                                        <tr className="week_table_row">
                                            <td className="table_data"><h2 className="week_table_temp_value">{value[0]}°C</h2></td>
                                        </tr>
                                        <tr className="week_table_row">
                                            <td className="table_data"><img className="week_weather_image" src={"http://openweathermap.org/img/wn/" + value[1] + ".png"} alt="Week Weather Icon" /></td>
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
            return (
                <div id="month_box" key={"month"}>
                    <div id="date_icon_temp_month">
                        <img id="month_box_weather_image" src={"http://openweathermap.org/img/wn/" + data.this_month.weather_icon + ".png"} alt="Month Weather Icon"></img>
                        <div id="date_temp_month">
                            <h5>{data.this_month.date}</h5>
                            <h6>{data.this_month.main_temp}°C</h6>
                            <p>{data.this_month.weather_title}</p>
                        </div>
                    </div>
                    <div id="high_low_humid_pressure_month">
                        <p>The high will be {data.this_month.max_temp}°C, the low will be {data.this_month.min_temp}°C</p>
                        <p>Humidity: {data.this_month.humidity}</p>
                        <p>Pressure: {data.this_month.pressure}</p>
                    </div>
                </div>
            );   
        }
        
        default :
            return null;
    }
}