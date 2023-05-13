import React from 'react';
import { useState, useEffect } from 'react';
import { MainCity } from './MainCity';
import { AddCity } from './AddCity';
import { AltCity } from './AltCity';
import { Search } from './Search';
import { Localization } from './Localization';
import { isItDaytime, isItTheWorstWeather, isItADifferentDay, convertTimeOffsetToDate, getWeekday, getMonth } from '../converters';
import '../css/Caller.css'

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
                
                    let todayTempMap = new Map();  // This is all we need for Today's box: keys are the hours, values are their temp values.
                    let weekWeatherMap = new Map(); // A Map is required for the forecasted weather for 'This week' box.
                    let monthWeatherObj = {};  // An Object is sufficient to contain the infos for 'This month' box.
                    let maxTempForEachDay = []; // Array that stores the maximum temperature registered for each day.
                    let minTempForEachDay = []; // Array that stores the minimum temperature registered for each day.
                    let humidityForEachDay = []; // Humidity values for each day as Array of arrays (first element: sum of humidity values for the day, second element: times humidity got updated).
                    let pressureForEachDay = []; // Humidity values for each day as Array of arrays (first element: sum of pressure values for the day, second element: times pressure got updated). 
                    let worstWeather = [[null, null, null, null]];  // Array that stores the worst weather condition for each day (during daytime, 8AM-8PM).
                    let actualDate = "2023-01-01 00:00:00";  // Default initial date. 
                    
                    for(let i=0, j=-1; i<resUrlForecastCall.list.length; i++)
                    {
                        if (i < 4)  // We need to display in Today's box only the next 3(x3) hours and their temp values.
                        {
                            let dt_txt_DateObject =  new Date(resUrlForecastCall.list[i].dt_txt);  // Let's create a Date object from the date string dt_txt in the JSON, and use that as the key for the map that associates a hour to its temp value.
                            todayTempMap.set(dt_txt_DateObject.getHours(), Math.round(resUrlForecastCall.list[i].main.temp));  // Here we just register the 3 next forecasted hours, since every entry in .list has a 3 hours difference from its previous element.
                        }
                        
                        if (isItADifferentDay(resUrlForecastCall.list[i].dt_txt, actualDate ) === true)  // Did we just parse data for a new day?
                        {
                            actualDate = resUrlForecastCall.list[i].dt_txt;  // If so, let's register it's another day and let's move out to search for the highest temp, the "worst case weather" and the average humidity of it (j++).
                            j++;
                            humidityForEachDay.push([0,0]);
                            pressureForEachDay.push([0,0]);
                        }


                        /* Time to work on humidity and pressure counters. */
                        humidityForEachDay[j][0] += resUrlForecastCall.list[i].main.humidity;  // We add the current humidity value to the total.
                        humidityForEachDay[j][1]++;  // We register that we just had a measurement.
                        pressureForEachDay[j][0] += resUrlForecastCall.list[i].main.pressure;  // We add the current pressure value to the total.
                        pressureForEachDay[j][1]++;  // We register that we just had a measurement.


                        /* Time to work on the arrays for minimum and maximum temperature of the day. */
                        if (maxTempForEachDay[j] === undefined)  // maxTempForEachDay[j] shouldn't be undefined, or the next 'if' statement is not going to succeed since it would compare int to undefined.
                        {
                            maxTempForEachDay[j] = -Infinity;  // Every max temperature value fetched, even if negative, will always be greater than -infinity. 
                        }
                        if (resUrlForecastCall.list[i].main.temp > maxTempForEachDay[j])  // Is this the the new highest temperature of the day?  maxTempForEachDay[j] should now NOT be undefined.
                        {
                            maxTempForEachDay[j] = resUrlForecastCall.list[i].main.temp;  // If yes, time to update the highest temperature value of the day.
                        }
                        if (minTempForEachDay[j] === undefined)  // minTempForEachDay[j] shouldn't be undefined, or the next 'if' statement is not going to succeed since it would compare int to undefined.
                        {
                            minTempForEachDay[j] = Infinity;  // Every min temperature value fetched, even if positive, will always be greater than +infinity. 
                        }
                        if (resUrlForecastCall.list[i].main.temp < minTempForEachDay[j])  // Is this the the new lowest temperature of the day?  minTempForEachDay[j] should now NOT be undefined.
                        {
                            minTempForEachDay[j] = resUrlForecastCall.list[i].main.temp;  // If yes, time to update the lowest temperature value of the day.
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

                    /* Now let's prepare the weekWeatherMap: key is the day of the week, value is its weather details: temp value is stored in maxTempForEachDay, while weather details are stored in worstWeather. */
                    let date = new Date(); 
                    date.setDate(date.getDate() + 1);   // i=1 and date+1 because we're skipping today's info in the week/month box.
                    for (let i=1; i<4; i++, date.setDate(date.getDate() + 1) )  // i<4 because we need to display only the 3 next days in the Week box.
                        weekWeatherMap.set(getWeekday(date.getDay()), [Math.round(maxTempForEachDay[i]), worstWeather[i][3]]);

                    /* Now let's prepare the monthWeatherObj: we have to calculate the average temp, the average weather, the average humidity and dew point of the day showed in the box (which is +3 days from today, the limit for this free API), plus the highest and the lowest temp value of it. */
                    const avgHumidityMonthly = Math.round(humidityForEachDay[humidityForEachDay.length-1][0] / humidityForEachDay[humidityForEachDay.length-1][1]) + "%";
                    const avgPressureMonthly = Math.round(pressureForEachDay[pressureForEachDay.length-1][0] / pressureForEachDay[pressureForEachDay.length-1][1]) + " hPa";
                    date = new Date(actualDate);  // actualDate still contains the date of the last day listed in API response.
                    monthWeatherObj = {
                        date : (getWeekday(date.getDay()) + ", " + date.getDate() + " " + getMonth(date.getMonth())),
                        main_temp : maxTempForEachDay[maxTempForEachDay.length - 1],
                        weather_title : worstWeather[worstWeather.length - 1][0],
                        weather_icon : worstWeather[worstWeather.length - 1][3],
                        max_temp : maxTempForEachDay[maxTempForEachDay.length - 1],
                        min_temp : minTempForEachDay[minTempForEachDay.length - 1],
                        humidity : avgHumidityMonthly,
                        pressure : avgPressureMonthly
                    }

                    /* We already have todayTempMap ready, we prepared it in the 'for' loop. No additional operations on it are needed, we can return the maps that will make the forecastedData state variable. */
                    return ({
                        "today": todayTempMap,
                        "this_week" : weekWeatherMap,
                        "this_month" : monthWeatherObj
                    });  // And the forecastedData state variable is now set.
                });


                setAltCity1Data({
                    "name" : resUrlAltCity1Call.name,
                    "weather" : resUrlAltCity1Call.weather[0].main,
                    "weather_description" : resUrlAltCity1Call.weather[0].description,
                    "icon" : resUrlAltCity1Call.weather[0].icon,
                    "temperature" : Math.round(resUrlAltCity1Call.main.temp),
                    "time" : convertTimeOffsetToDate( resUrlAltCity1Call.timezone )  // time attribute is a Date data type.
                });

                setAltCity2Data({
                    "name" : resUrlAltCity2Call.name,
                    "weather" : resUrlAltCity2Call.weather[0].main,
                    "weather_description" : resUrlAltCity2Call.weather[0].description,
                    "icon" : resUrlAltCity2Call.weather[0].icon,
                    "temperature" : Math.round(resUrlAltCity2Call.main.temp),
                    "time" : convertTimeOffsetToDate( resUrlAltCity2Call.timezone )  // time attribute is a Date data type.
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
