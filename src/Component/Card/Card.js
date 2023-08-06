import React from 'react'
import './Card.css'

const Card = ({ book ,handleEdit }) => {
  return (
    <div className='Card'>
        <div className="detail">
          
          <h3 className="title">{book.title}</h3>
          
          <button class="Btn" onClick={()=>{handleEdit(book)}}>
            <div class="sign">&#9998;</div>
          </button>
        
        </div>
        <div className="detail">
        
            <p className="author">{book.author}</p>
            <p className='Pages'>{book.pages ? `Pages : ${book.pages}`:''}</p>
        
        </div>
    </div>
  )
}

export default Card
