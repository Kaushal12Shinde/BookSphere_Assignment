import React from 'react'
import './searchbar.css'

const Searchbar = ({ searchedText , setSearchedText }) => {

    const handleSearch = (e) =>{
        e.preventDefault();
        setSearchedText(e.target.value);
    }

    return (
        <div className="Searchbar">
                <input type="text" 
                    onChange={handleSearch} 
                    placeholder='Search by name ...' 
                    value={searchedText}
                />
        </div>
    )
}

export default Searchbar
