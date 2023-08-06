import axios from 'axios'
import './bookForm.css'

const BookForm = ({ bookDetails , setBookDetails , setDisplay , notify, editId, setEditId}) => {
    
    // <----- From Details ----->

    const handleChange = (e) => {
        setBookDetails({
            ...bookDetails,
            [e.target.name]: e.target.value
        });
    }

    // <---- Post and Put Request ----->


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editId){
            console.log(bookDetails);
            let id = editId;
            await axios.put(`http://68.178.162.203:8080/application-test-v1.1/books/${id}`, bookDetails)
            .then((reponse)=>{
                notify('Book added successfully!')
                console.log(reponse);
            })
            .catch((error)=>{
                console.error(error);
                notify('Failed to add book');
            })
            setEditId(null);
        }
        else
        {
            console.log(bookDetails);
            await axios.post("http://68.178.162.203:8080/application-test-v1.1/books", bookDetails)
            .then((reponse)=>{
                notify('Book added successfully!')
                console.log(reponse);
            })
            .catch((error)=>{
                console.error(error);
                notify('Failed to add book');
            })
        }

        setDisplay(false);
    }



  return (
    <div className='BookForm'>
      <form onSubmit={handleSubmit}>
            <div>
                <p>Title</p>
                <input name="title" value={bookDetails.title} onChange={handleChange} required />
            </div>
            <div>
                <p>Author</p>
                <input name="author" value={bookDetails.author} onChange={handleChange} required />
            </div>
            <div>
                <p>Language</p>
                <input name="language" value={bookDetails.language} onChange={handleChange} required />
            </div>
            <div>
                <p>Link</p>
                <input name="link" value={bookDetails.link} onChange={handleChange} required />
            </div>
            <div>
                <p>Pages</p>
                <input name="pages" value={bookDetails.pages} onChange={handleChange} required />
            </div>
            <div>
                <p>Year</p>
                <input name="year" value={bookDetails.year} onChange={handleChange} required />
            </div>
            <div>
                <p>Country</p>
                <input name="country" value={bookDetails.country} onChange={handleChange} required />
            </div>
            <button type="submit">Add to Books List</button>
        </form>
    </div>
  )
}

export default BookForm