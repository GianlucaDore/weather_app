import React from 'react';
import geotag from '../images/geotag.png';
import '../css/Localization.css';

export const Localization = () =>
{
    return(
        <div id="localization">
            <h2>Localization</h2>
            <button id="localization_button" disabled>
                <img id='localization_image' src={geotag} alt="geotag-symbol"></img>
                <h3>Add localization</h3>
            </button>
        </div> 
        
    )
}