import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./booklist.css";
import axios from "axios";
import Searchbar from "../Searchbar/Searchbar";
import Card from "../Card/Card";
import BookForm from "../BookForm/BookForm";

const Booklist = () => {

  const [booksData, setBooksData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [booksList, setBooksList] = useState([]);
  const [language, setLanguage] = useState("");
  const [sortType, setSortType] = useState("");
  const [display, setDisplay] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    id:"",
  });

// <---- Pop up ----->
  
  const notify = (message) => toast(`${message}`, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  
// <----- Add Form ----->

    const handleAddForm = () => {
      setDisplay(true);
    };

// <----- Adding in watchList ----->

    const handleAddWatchList = (book) => { 
      
      let savedBooks = JSON.parse(localStorage.getItem('savedBooks'));
      if (savedBooks) {
        
        if (!savedBooks.some(existingBook => existingBook.id === book.id)) {
          savedBooks.push(book);
          localStorage.setItem("books", JSON.stringify(savedBooks));
          notify('Book added to list!');
        }
        else
          notify(`Already Added!`);
      
      } 
      else {
       
        savedBooks = [];
        savedBooks.push(book);
        notify('Book added to list!');
      
      }
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    }


// <----- Deleting from watchList ----->
  
    const handleDelete = (book) => {
      
      const books = JSON.parse(localStorage.getItem('savedBooks'));
      const updatedBooks = books.filter(existingBook => existingBook.id !== book.id);
      localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
      setIsUpdate(!isUpdate);
    
    }


// <----- Active WatchLIst ----->`

    const handleActiveWatchList = () =>{
      setIsActive(!isActive);
    }


// <----- filter with Language ----->

    const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
    };


// <----- filter by SortingType ------>

    const handleSortType = (e) => {
      setSortType(e.target.value);
    };


// <------ filter And Search ----->

    useEffect(() => {
      
      if (booksData) {
        let filteredBooks = isActive ? JSON.parse(localStorage.getItem('savedBooks')) : booksData;

        // Apply text search filter
          if (searchedText.length > 0) {
            let text = searchedText.toLowerCase();
            filteredBooks = filteredBooks.filter((book) => {
            
              let title = book.title.toLowerCase();
              return title.includes(text);
            
            });
          }

        // Apply language filter
          if (language) {
            filteredBooks = filteredBooks.filter((book) => book.language === language);
          }

        setBooksList(filteredBooks);
      }

    }, [searchedText, language, booksData, isActive , isUpdate]);


// <----- Sorting w.r.t Pages ------>  

    useEffect(() => {
      
      if (sortType && booksList) {
        let filteredBooks = [...booksList];
        
        if (sortType === "asc") {
          filteredBooks.sort((a, b) => (parseInt(a.pages) || 0) - (parseInt(b.pages) || 0));
        } 
        else {
          filteredBooks.sort((a, b) => (parseInt(b.pages) || 0) - (parseInt(a.pages) || 0));
        }
        
        setBooksList(filteredBooks);
      }
    
    }, [sortType]);


// <-------- Api Call -------->

    const getBook = async () => {
      try {
        let {data:{ data }} = await axios(`http://68.178.162.203:8080/application-test-v1.1/books`);
        return data;
      } 
      catch (error) {
        alert("Data Not Found");
      }
    };

    useEffect(() => {
      getBook().then((data) => {
          console.log(data)
        setBooksData(data);
      });
    }, []);

    
// <---------------------->


  return (
    <div className="Booklist">
      <ToastContainer />
      {!display && <h1 className="head">BookSphere</h1>}
      
      {!display && (
        <Searchbar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
      )}

      {!display && (
        <div className="feature">
          
          <select onChange={handleLanguageChange}>
            <option selected disabled hidden>
              Select Languages
            </option>
            <option value="">All</option>
            <option value="English">English</option>
          </select>
          
          <select onChange={handleSortType}>
            <option selected disabled hidden>
              Sort
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          
          <button onClick={handleAddForm}>Add Book</button>
          <button onClick={handleActiveWatchList} style={{backgroundColor: isActive ? '#CCCCFF' : 'white'}}>My Book List</button>
          {isActive && <button onClick={()=>{localStorage.clear(); setIsUpdate(!isUpdate);}}>Clear All</button>}
        
        </div>
      )}

      {!display && (
        <div className="content">
          {booksList ?
            booksList.map((book) => 
                <Card 
                  book={book} 
                  key={book.id} 
                  handleAddWatchList={handleAddWatchList} 
                  isActive={isActive} 
                  handleDelete={handleDelete}
                />
            ) :
            <h3 className="loading">No Books added Yet</h3>
          }
        </div>
      )}

      {display && (
        <BookForm
          bookDetails={bookDetails}
          setBookDetails={setBookDetails}
          setDisplay={setDisplay}
          handleAddWatchList={handleAddWatchList}
        />
      )}
    </div>
  );
};

export default Booklist;
