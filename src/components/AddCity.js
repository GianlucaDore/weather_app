import React from "react";
import plusIcon from '../images/plus.png';
import '../css/AddCity.css'

export const AddCity = () =>
{
    return (
        <div id="add_city">
            <img id="plus_icon" src={plusIcon} alt="Add city icon" />
            <p id="add_city_paragraph">Add city</p>
        </div>
    );
}