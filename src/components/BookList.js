import PropTypes from 'prop-types'
import React, { Component } from 'react'
import BookCard from './BookCard'

export default class BookList extends Component {

    static propTypes = {
        listOfBooks: PropTypes.array
    }

    handleSelect = (event) => {
        console.log(`Event from the parent: ${event}`)
    }

  render() {
      return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                              <ol className="books-grid">
                                  {console.log(this.props)}
                    ({this.props.listOfBooks.map(book => {
                        return <li key={book.id}><BookCard book={book} handleSelect={ this.handleSelect } /></li>
                    })
                    })
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                    ({this.props.listOfBooks.map(book => {
                        return <li key={book.id}><BookCard book={ book } handleSelect={ this.handleSelect } /></li>
                    })
                    })
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                    ({this.props.listOfBooks.map(book => {
                        return <li key={book.id}><BookCard book={ book } handleSelect={ this.handleSelect } /></li>
                    })
                    })
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
      )
  }
}
