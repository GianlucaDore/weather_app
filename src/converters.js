export const getWeekday = (dayNumber) =>
{
    switch (dayNumber)
    {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";
        
        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";

        default:
            return null;
    }

}

export const getMonth = (monthNumber) =>
{
    switch (monthNumber)
    {
        case 1:
            return "January";

        case 2:
            return "February";

        case 3:
            return "March";
        
        case 4:
            return "April";

        case 5:
            return "May";

        case 6:
            return "June";

        case 7:
            return "July";

        case 8:
            return "August";
    
        case 9:
            return "September";
            
        case 10:
            return "October";
    
        case 11:
            return "November";
    
        case 12:
            return "December";

        default:
            return null;
    }

}

export const isItDaytime = (dateGiven) =>
{
    let date = new Date(dateGiven);
    if (date.getHours() >= 8 && date.getHours() <= 19)
        return true;
    else
        return false;
}

export const isItTheWorstWeather = (mainWeather, weatherCode, actualWorstWeather) =>
{
    let actualWorstWeatherMain = actualWorstWeather[0] ?? null;  // This is to prevent the error you get when inspecting the index 0 cell of an array when it's set to undefined.
    let actualWorstWeatherId = actualWorstWeather[2] ?? 0;  // Same as above.

    switch (mainWeather) 
    {
        case 'Snow' :
            return true;
        
        case 'Thunderstorm' :
        {
            if (actualWorstWeatherMain === 'Snow')
                return false;
            if (actualWorstWeatherMain === null)
                return true;
            else
                break;
        }

        case 'Rain' :
        {
            if (actualWorstWeatherMain === 'Snow' || actualWorstWeatherMain === 'Thunderstorm' )
                return false;
            if (actualWorstWeatherMain === 'Drizzle' || actualWorstWeatherMain === 'Clear' || actualWorstWeatherMain === 'Clouds' || actualWorstWeatherMain === null)
                return true;

            else
                break;
        }

        case 'Drizzle' :
        {
            if (actualWorstWeatherMain === 'Snow' || actualWorstWeatherMain === 'Thunderstorm' || actualWorstWeatherMain === 'Rain')
                return false;

            if (actualWorstWeatherMain === 'Clear' || actualWorstWeatherMain === 'Clouds' || actualWorstWeatherMain === null)
                return true;

            else
                break;
        }

        case 'Clouds' :
        {
            if (actualWorstWeatherMain === 'Clear' || actualWorstWeatherMain === null)
                return true;
            else
                return false;
        }

        case 'Clear' :
        {
            if (actualWorstWeatherMain === null)
                return true;
            else
                return false;
        }

        default :
        {
            return false;
        }
    }

    if (actualWorstWeatherId < weatherCode) 
        return true;
    else
        return false;
}

export const isItADifferentDay = (dateFetched, actualDate) =>
{
    let date_fetched = new Date(dateFetched);
    let actual_date = new Date(actualDate);

    if (date_fetched.getFullYear() === actual_date.getFullYear() && date_fetched.getMonth() === actual_date.getMonth() && date_fetched.getDate() === actual_date.getDate())
        return false;
    else
        return true;
}

export const convertTimeOffsetToDate = (secondsFromUTC) =>
{
    let convertedDate = new Date();  // Instanciating a Date object with the current UTC time.
    convertedDate.setSeconds(convertedDate.getSeconds() + secondsFromUTC);

    return convertedDate;
}

