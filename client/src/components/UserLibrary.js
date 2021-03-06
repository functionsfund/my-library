import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserBook } from '../actions/DeleteBook';
import { fetchUserBooks } from '../actions/FetchBooks';

class userLibrary extends Component {

  state = {
    selectedBooks: [],
    userId: '',
    books: [],
  }

  componentWillMount(){
   fetch(`http://localhost:3001/users/${this.props.userId}/books`)
   .then(response => response.json())
   .then( response => {
     console.log("User Books:", response)
     this.setState({
       selectedBooks: response
       })
     })
  }

  // fetchBooks = () => {
  //   const userId = this.props.session.auth.userId;
  //
  //
  //   if(this._isMounted) {
  //     this.setState({
  //       books: [],
  //     });
  //   }
  //   this.props.fetchUserBooks(userId)
  // }

  deleteBook = (book) => {
    const userId = this.props.userId;

    //deleteUserBook(userId, book, () => {
    //  this.setState({
    //    selectedBooks: [],
    //  });
    //});
    //this.componentWillMount()
    this.props.deleteUserBook(userId, book)
    this.props.history.push("/library")
  };



  render(){
    const userBooks = this.state.selectedBooks.map((book, idx) =>(
        <div className='col-3 my-4' key={idx}>
          <div className='card'>
            <div className='card-title'>
              <a href={book.link}><h3>{book.title}</h3></a>
            </div>
            <div className='card-authors'>
              <h3>{book.authors}</h3>
            </div>
            <div className='scroll-box'>
              <p>{book.description}</p><br></br>
            </div>
            <button onClick={() => this.deleteBook(book)}>Remove this book.</button>
          </div>
        </div>
    ));

    return(
      <div className="user-library">
      <br></br>
      <h1>Your library:</h1>
      <br></br>
        <div className="row">
          {userBooks}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.session.auth.userId,
    selectedBooks: state.selectedBooks,
  }
}

export default connect(mapStateToProps, { deleteUserBook , fetchUserBooks })(userLibrary);
