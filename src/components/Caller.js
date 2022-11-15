import React from 'react';
import { useState, useEffect } from 'react';
import { MainCity } from './MainCity';
import { AltCity } from './AltCity';


export const MainCityContext = React.createContext(
    null // context initial value. Let's fetch weather data, making our Caller component the provider. The main city box and the other two boxes will be consumers of this context, aka the data fetched.
);


export const Caller = () =>
{
    const [mainCityData, setMainCityData] = useState(null);
    const [altCity1Data, setAltCity1Data] = useState(null);
    const [altCity2Data, setAltCity2Data] = useState(null);

    useEffect(() =>
        {
            const fetchData = async () =>
            {
                const urlMainCityBox = "https://api.openweathermap.org/data/2.5/weather?lat=45.0677551&lon=7.6824892&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                // const urlTodayBox = "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=45.0677551&lon=7.6824892&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                // const urlWeekMonthBox = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=45.0677551&lon=7.6824892&cnt=7&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                const urlAltCity1 = "https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";
                const urlAltCity2 = "https://api.openweathermap.org/data/2.5/weather?lat=41.8933203&lon=12.4829321&units=metric&appid=65e03b16f8eb6ba0ef7776cd809a50cd";


                let globalResponse = await Promise.all([
                    fetch(urlMainCityBox),
                    //fetch(urlTodayBox),
                    //fetch(urlWeekMonthBox),
                    fetch(urlAltCity1),
                    fetch(urlAltCity2)
                ]);

                const resMainCityCall = await globalResponse[0].json();
                // const resUrlTodayBoxCall = await globalResponse[1].json();
                // const resUrlWeekMonthBoxCall = await globalResponse[2].json();
                const resUrlAltCity1Call = await globalResponse[1].json();
                const resUrlAltCity2Call = await globalResponse[2].json();

                /* QUESTE SETSTATE NON STANNO FACENDO AWAITING, QUINDI VENGONO ESEGUITE PRIMA CHE LE FETCH RITORNINO.
                    CORREGGERE CON resMainCityCall.then(setMainCityData())  (...) in maniera da attendere che ritorni il metodo json. */
                setMainCityData({
                    "name" : resMainCityCall.name,
                    "weather" : resMainCityCall.weather[0].main,
                    "weather_description" : resMainCityCall.weather[0].description,
                    "icon" : resMainCityCall.weather[0].icon,
                    "temperature" : resMainCityCall.weather[0].main.temp,
                    "time" : convertTimeOffsetToDate( resMainCityCall.timezone )
                    // spot for the forecasted data (paid API on OpenWeather).

                });

                setAltCity1Data({
                    "name" : resUrlAltCity1Call.name,
                    "weather" : resUrlAltCity1Call.weather[0].main,
                    "weather_description" : resUrlAltCity1Call.weather[0].description,
                    "icon" : resUrlAltCity1Call.weather[0].icon,
                    "temperature" : resUrlAltCity1Call.weather[0].main.temp,
                    "time" : convertTimeOffsetToDate( resUrlAltCity1Call.timezone )  // time attribute is type Date
                });

                setAltCity2Data({
                    "name" : resUrlAltCity2Call.name,
                    "weather" : resUrlAltCity2Call.weather[0].main,
                    "weather_description" : resUrlAltCity2Call.weather[0].description,
                    "icon" : resUrlAltCity2Call.weather[0].icon,
                    "temperature" : resUrlAltCity2Call.weather[0].main.temp,
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
          <MainCityContext.Provider value={ mainCityData } >
            {!!mainCityData ? <MainCity /> : null}
          </MainCityContext.Provider>
          {!!altCity1Data ? <AltCity data = {altCity1Data} /> : null}
          {!!altCity2Data ? <AltCity data = {altCity2Data} /> : null}
        </div>    
    );

}

const convertTimeOffsetToDate = (secondsFromUTC) =>
{
    let convertedDate = new Date();  // Instanciating a Date object with the current UTC time.
    convertedDate.setSeconds(convertedDate.getSeconds() + secondsFromUTC);

    return convertedDate;
}