import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";

class BooksApp extends React.Component {
  /**
   * Getting the books from the server
   */
  init = async () => {
    this.setState({
      loadBooks: await BooksAPI.getAll(),
    });

    this.setState({
      currentlyReading: this.state.loadBooks.filter(
        (book) => book.shelf === "currentlyReading"
      ),
      wantToRead: this.state.loadBooks.filter(
        (book) => book.shelf === "wantToRead"
      ),
      read: this.state.loadBooks.filter((book) => book.shelf === "read"),
    });
  };
  // constructor(){}
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
    console.log(`From App: ${response}`);
    this.init();
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
