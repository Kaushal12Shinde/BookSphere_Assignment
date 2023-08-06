import React, { useEffect, useState } from 'react'
import './searchbar.css'

const Searchbar = ({ setSearchedText }) => {

    const [text, setText] = useState('');
    const [timerId,setTimerId] = useState();
    const [helper,setHelper] = useState(false);

// <----- Debouncing ----->

    const handleSearch = (e) =>{
        e.preventDefault();
        setText(e.target.value);
        
        if (timerId) {
            clearTimeout(timerId);
        }
    
        setTimerId(setTimeout(() => {
            setHelper(!helper);
        }, 1000));

    }

    useEffect(()=>{
        setSearchedText(text);
    },[helper])  
    

    return (
        <div className="Searchbar">
                <input type="text" 
                    onChange={handleSearch} 
                    placeholder='Search by name ...' 
                    value={text}
                />
        </div>
    )
}

export default Searchbar
