import React from 'react';
import { useState, useEffect } from 'react';
import { MainCity } from './MainCity';
import { AddCity } from './AddCity';
import { AltCity } from './AltCity';
import { Search } from './Search';
import { Localization } from './Localization';
import { isItDaytime, isItTheWorstWeather, isItADifferentDay, convertTimeOffsetToDate, getWeekday } from '../converters';


export const MainCityContext = React.createContext(
    null // context initial value. Let's fetch weather data, making our Caller component the provider. The main city box and the other two boxes will be consumers of this context, aka the data fetched.
);


export const Caller = () =>
{
    const [mainCityData, setMainCityData] = useState(null);
    const [forecastedData, setForecastedData] = useState(null);
    const [altCity1Data, setAltCity1Data] = useState(null);
    const [altCity2Data, setAltCity2Data] = useState(null);

    useEffect(() =>
        {
            const fetchData = async () =>
            {
                const urlMainCityBox = "https://api.openweathermap.org/data/2.5/weather?lat=45.0677551&lon=7.6824892&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                const urlForecastBox = "https://api.openweathermap.org/data/2.5/forecast?lat=45.0677551&lon=7.6824892&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                const urlAltCity1 = "https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                const urlAltCity2 = "https://api.openweathermap.org/data/2.5/weather?lat=41.8933203&lon=12.4829321&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";


                let globalResponse = await Promise.all([
                    fetch(urlMainCityBox),
                    fetch(urlForecastBox),
                    fetch(urlAltCity1),
                    fetch(urlAltCity2)
                ]);

                const resMainCityCall = await globalResponse[0].json();
                const resUrlForecastCall = await globalResponse[1].json();
                const resUrlAltCity1Call = await globalResponse[2].json();
                const resUrlAltCity2Call = await globalResponse[3].json();

                
                setMainCityData({
                    "name" : resMainCityCall.name,
                    "weather" : resMainCityCall.weather[0].main,
                    "weather_description" : resMainCityCall.weather[0].description,
                    "icon" : resMainCityCall.weather[0].icon,
                    "temperature" : resMainCityCall.weather[0].main.temp,
                    "time" : convertTimeOffsetToDate( resMainCityCall.timezone )

                });


                setForecastedData(() => {
                
                    let todayTempMap = new Map();  // This is all we need for Today's box: key are the hours, values are their temp values.
                    let weekWeatherMap = new Map();
                    let maxTemp = [0];      // Array that stores the maximum temp registered for each day.
                    let worstWeather = [[null, null, null, null]];  // Array that stores the worst weather condition for each day (during daytime, 8AM-8PM).
                    let actualDate = "2022-11-15 00:00:00"; 
                    
                    for(let i=0, j=-1; i<resUrlForecastCall.list.length; i++)
                    {
                        if (i < 4)  // We need to display in Today's box only the next 3(x3) hours and their temp values.
                        {
                            let dt_txt_DateObject =  new Date(resUrlForecastCall.list[i].dt_txt);  // Let's create a Date object from the date string dt_txt in the JSON, and use that as the key for the map that associates a hour to its temp value.
                            todayTempMap.set(dt_txt_DateObject.getHours(), Math.round(resUrlForecastCall.list[i].main.temp));  // Here we just register the 3 next forecasted hours, since every entry in .list has a 3 hours difference from its previous element.
                        }
                        
                        if (isItADifferentDay(resUrlForecastCall.list[i].dt_txt, actualDate ) === true)  // Did we just parsed data for another day?
                        {
                            actualDate = resUrlForecastCall.list[i].dt_txt;  // If so, let's register it's another day and let's move out to search for the highest temp and worst weather of it (j++).
                            j++;
                        }

                        if (maxTemp[j] === undefined)  // maxTemp[j] shouldn't be undefined, or the next if is not going to succeed since it would compare int to undefined.
                        {
                            maxTemp[j] = -Infinity;  // Every temp value fetched, even if negative, will always be greater than -infinity. 
                        }
                        if (resUrlForecastCall.list[i].main.temp > maxTemp[j])  // Is this the the highest temperature of the day?  maxTemp[j] should now NOT be undefined.
                        {
                            maxTemp[j] = resUrlForecastCall.list[i].main.temp;  // If yes, time to update the highest temp value of the day.
                        }

                        if (isItDaytime(resUrlForecastCall.list[i].dt_txt) === true)  // The weather icon for the day is based on the worst condition during daytime (8AM-8PM).
                        {
                            if (worstWeather[j] === undefined)  // Let's avoid passing an undefined parameter.
                                worstWeather[j] = [null, null, null, null];

                            if (isItTheWorstWeather(resUrlForecastCall.list[i].weather[0].main, resUrlForecastCall.list[i].weather[0].id, worstWeather[j]) === true) // Is this the worst weather of the day?
                            {
                                worstWeather[j][0] = resUrlForecastCall.list[i].weather[0].main;  // If so, let's register it as the current worst weather of the day.
                                worstWeather[j][1] = resUrlForecastCall.list[i].weather[0].description;
                                worstWeather[j][2] = resUrlForecastCall.list[i].weather[0].id;
                                worstWeather[j][3] = resUrlForecastCall.list[i].weather[0].icon;
                            }
                        }
                    }

                    /* Now let's prepare the weekWeatherMap: key is the day of the week, value is its weather details: temp value is stored in maxTemp, while weather details are stored in worstWeather. */
                    const date = new Date(); 
                    date.setDate(date.getDate() + 1);   // i=1 and date+1 because we're skipping today's info in the week/month box.
                    for (let i=1; i<4; i++, date.setDate(date.getDate() + 1) )  // i<4 because we need to display only the 3 next days in the Week box.
                        weekWeatherMap.set(getWeekday(date.getDay()), [Math.round(maxTemp[i]), worstWeather[i][3]]);

                    /* We already have todayTempMap ready, we prepared it in the for loop. No additional operations on it are needed, we can return the maps that will make the forecastedData state variable. */
                    return ({
                        "today": todayTempMap,
                        "this_week" : weekWeatherMap
                    });  // And the forecastedData state variable is now set.
                });


                setAltCity1Data({
                    "name" : resUrlAltCity1Call.name,
                    "weather" : resUrlAltCity1Call.weather[0].main,
                    "weather_description" : resUrlAltCity1Call.weather[0].description,
                    "icon" : resUrlAltCity1Call.weather[0].icon,
                    "temperature" : Math.round(resUrlAltCity1Call.main.temp),
                    "time" : convertTimeOffsetToDate( resUrlAltCity1Call.timezone )  // time attribute is type Date
                });

                setAltCity2Data({
                    "name" : resUrlAltCity2Call.name,
                    "weather" : resUrlAltCity2Call.weather[0].main,
                    "weather_description" : resUrlAltCity2Call.weather[0].description,
                    "icon" : resUrlAltCity2Call.weather[0].icon,
                    "temperature" : Math.round(resUrlAltCity2Call.main.temp),
                    "time" : convertTimeOffsetToDate( resUrlAltCity2Call.timezone )  // time attribute is type Date
                });

                console.log("Status updated.");

            }

            fetchData().catch((error) => { console.log("There was an error: " + error)});

        }, []); // useEffect triggers only after mounting phase for now.

        // spot left for declaring the spinner and setting it on by default.
        // spot left for setting the spinner off in case the state is not null (data is fetched).

    
    return (
        <div id="total_render">
          <MainCityContext.Provider value={ [mainCityData, forecastedData] } >
            {!!mainCityData ? <MainCity /> : null}
          </MainCityContext.Provider>
          <div id="alt_cities_search_localization">
            <div id="alt_cities">
                {!!mainCityData ? <AddCity /> : null}
                {!!altCity1Data ? <AltCity data = {altCity1Data} /> : null}
                {!!altCity2Data ? <AltCity data = {altCity2Data} /> : null}
            </div>
            <div id="search_localization">
                {!!mainCityData ? <Search /> : null}
                {!!mainCityData ? <Localization /> : null}
            </div>
          </div>
        </div>    
    );

}
