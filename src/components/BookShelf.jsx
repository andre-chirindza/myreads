import PropTypes from 'prop-types'
import React, { Component } from 'react'
import BookCard from './BookCard'

export default class BookShelf extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        listOfBooks: PropTypes.array.isRequired
    }

  render() {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ this.props.status }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.listOfBooks.map(book => {
                        console.log(book.title)
                        return <li key={book.id}>
                            <BookCard book={book} selectHandler={this.props.selectHandler} />
                        </li>
                        })
                    }
                </ol>
            </div>
        </div>
    )
  }
}
