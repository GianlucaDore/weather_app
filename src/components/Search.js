import React from 'react';
import search from '../images/search_lens.png'

export const Search = () =>
{
    return (
        <div id="search">
            <h3>Search</h3>
            <form className='search-form'>
                <input className='search-form' name="city-search" placeholder='Enter a city name...'></input>
                <button type="submit" disabled>
                    <img src={search} alt="Search icon"/>
                </button>
            </form>
        </div>
    )
}