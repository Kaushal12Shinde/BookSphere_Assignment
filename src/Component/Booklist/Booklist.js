import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./booklist.css";
import axios from "axios";
import Searchbar from "../Searchbar/Searchbar";
import Card from "../Card/Card";
import BookForm from "../BookForm/BookForm";

const Booklist = () => {

// <----- For Storing ----->

    const [booksData, setBooksData] = useState([]);
    const [booksList, setBooksList] = useState([]);
    const [languages,setLanguages] = useState([]);
    const [bookDetails, setBookDetails] = useState({
      author: "",
      country: "",
      language: "",
      link: "",
      pages: "",
      title: "",
      year: "",
    });

// <----- For Searching and Filters ----->

    const [searchedText, setSearchedText] = useState("");
    const [sortType, setSortType] = useState("");
    const [languageType, setLanguageType] = useState("");
  
// <----- For Pagination ----->

    const [page, setPage] = useState(1);
    const [totalPage,setTotalPage] = useState();

//<----- For Post, Put ----->

    const [display, setDisplay] = useState(false);
    const [editId, setEditId] = useState();
  
  
  
  
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
  

// <---- Editing Existing Book ----->
    
    const handleEdit= (book)=>{
        setEditId(book.id);
        const { id, ...otherProperties } = book;
          setBookDetails({
              ...bookDetails,
              ...otherProperties
        });
        setDisplay(true);
    }


// <------ filter And Search ----->


    useEffect(() => {
      if (booksData) {
        let filteredBooks = booksData;
        // Apply language filter
          if (languageType) {
            filteredBooks = filteredBooks.filter((book) => book.language === languageType);
          }
        setBooksList(filteredBooks);
      }
    }, [ languageType, booksData ]);


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

    const handlePrevPage = () => {
      if(page>1)
        setPage(page-1);
    }

    const handleNextPage = () => {
      if(totalPage && page<totalPage)
        setPage(page+1);
    }


// <-------- Api Call -------->

    
    const getBook = async () => {

        let url = `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`;
          if (searchedText !== "") {
            url += `&title=${searchedText}`;
          }
          return await axios.get(url)
          .then((response) =>{
            setTotalPage(response.data.pagination.totalPages);
            console.log(response)
            return response.data
          })
          .catch((error) => notify(error))

    };
      

      useEffect(() => {
        if(!display){
        getBook().then((data) => {
          let books = data.data
          let setLang = new Set();
          books.forEach((book)=>{
            if(book.language)
              setLang.add(book.language);
          })
          setLanguages([...setLang]);
          setBooksData(books);
        });
      }
      }, [searchedText,page,display])

      
    
// <---------------------->


  return (
    <div className="Booklist">
      <ToastContainer />
      {!display && <h1 className="head">BookSphere</h1>}
      
      {!display && (
        <Searchbar
          setSearchedText={setSearchedText}
        />
      )}

      {!display && (
        <div className="feature">

          <select onChange={(e)=>{setLanguageType(e.target.value)}}>
            <option selected disabled hidden>
              Select Languages
            </option>
            <option value="">All</option>
            {languages && languages.map((lang)=> <option value={lang}>{lang}</option>)}
          </select>
          
          <select onChange={(e)=>{setSortType(e.target.value)}}>
            <option selected disabled hidden>
              Sort
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          
          <button onClick={()=>{setDisplay(true)}}>Add Book</button>
          
        </div>
      )}

      {!display && (
        <div className="content">
          {booksList && booksList.map((book) => 
                book.title && <Card 
                  book={book} 
                  key={book.id}
                  handleEdit={handleEdit} 
                />
              )
          }
          {booksList &&
            <div className="pagination">
              <button onClick={handlePrevPage}>&#8592;</button>
              <p className="page">{page}</p>
              <button onClick={handleNextPage}>&#8594;</button>
            </div>
          }
        </div>
      )}

      {display && (
        <BookForm
          bookDetails={bookDetails}
          setBookDetails={setBookDetails}
          setDisplay={setDisplay}
          notify={notify}
          editId={editId}
          setEditId={setEditId}
        />
      )}
    </div>
  );
};

export default Booklist;