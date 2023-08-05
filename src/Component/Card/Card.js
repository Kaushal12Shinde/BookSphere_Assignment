import React from 'react'
import './Card.css'

const Card = ({ book , handleAddWatchList , isActive , handleDelete}) => {
  return (
    <div className='Card'>
        <div className="detail">
          
          <h3 className="title">{book.title}</h3>
          
          {!isActive && <button class="Btn" onClick={()=>handleAddWatchList(book)}>
            <div class="sign">+</div>
          </button>}
          
          {isActive && <button class="Btn" onClick={()=>handleDelete(book)}>
            <div class="sign" style={{fontSize:'12px',fontWeight:'800'}}>&#10005;</div>
            </button>
          }
        
        </div>
        <div className="detail">
        
            <p className="author">{book.author}</p>
            <p className='Pages'>{book.pages ? `Pages : ${book.pages}`:''}</p>
        
        </div>
    </div>
  )
}

export default Card
