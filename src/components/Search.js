import React from 'react';
import search from '../images/search_lens.png';
import '../css/Search.css';

export const Search = () =>
{
    return (
        <div id="search">
            <h2>Search</h2>
            <form id='search-form'>
                <input id='search-input' name="city-search" placeholder='Enter a city name...'></input>
                <button id='search_submit' type="submit" disabled>
                    <img src={search} alt="Search icon"/>
                </button>
            </form>
        </div>
    )
}