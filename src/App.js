import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";

class BooksApp extends React.Component {
  /**
   * Getting the books from the server
   */

  setShelfState = (books) => {
    this.setState({
      currentlyReading: books.filter(
        (book) => book.shelf === "currentlyReading"
      ),
      wantToRead: books.filter(
        (book) => book.shelf === "wantToRead"
      ),
      read: books.filter((book) => book.shelf === "read"),
    });
  }
  init = async () => {
    this.setState({
      loadBooks: await BooksAPI.getAll(),
    });

    this.setShelfState(this.state.loadBooks)
    
  };

  /**
   * Setting the initial values vor the loadBooks and the shelfStates arrays
   */
  componentDidMount() {
    this.init();
  }

  state = {
    loadBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  /**
   * Update the books
   * @param {*} response
   */
  updateShelf = (response) => {
    if (!response.error) {
      let updatedBooks = this.state.loadBooks.map(book => {
        if (book.id === response.data.book.id) {
          book.shelf = response.data.book.shelf
          console.log(book)
        }
        return book;
      })
      this.setState({
        loadBooks: updatedBooks
      })
      this.setShelfState(updatedBooks);
    }
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-content">
            <div>
              <BookShelf
                status="Currently Reading"
                listOfBooks={this.state.currentlyReading}
                selectHandler={this.updateShelf}
              />
              <BookShelf
                status="Want to Read"
                listOfBooks={this.state.wantToRead}
                selectHandler={this.updateShelf}
              />
              <BookShelf
                status="Read"
                listOfBooks={this.state.read}
                selectHandler={this.updateShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <Link className="button" to="/search">
              Add a book
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
