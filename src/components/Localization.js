import React from 'react'
import geotag from '../images/geotag.png'

export const Localization = () =>
{
    return(
        <div id="localization">
            <h3>Localization</h3>
            <button id="localization_button" disabled>
                <img src={geotag} alt="geotag-symbol"></img>
                <p>Add localization</p>
            </button>
        </div>
        
    )
}