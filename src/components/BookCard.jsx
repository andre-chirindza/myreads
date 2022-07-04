import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Action from './actions/Action'
import * as BookAPI from '../BooksAPI'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default class BookCard extends Component {
    static propTypes = {
        selectHandler: PropTypes.func.isRequired,
        book: PropTypes.object
    }
    state = {
        book: this.props.book
    }
    /**
     * Update the book shelf
     * @param {event} e
     * @returns {object} data
     */
    handle = e => {
        this.setState({
            book: {
                ...this.props.book,
                shelf: e.target.value
            }
        });
        BookAPI.update(this.props.book, e.target.value)
            .then(data => {
                Swal.fire({
                    title: `Book Update`,
                    text: `You repository is updated`,
                    icon: 'success'
                });
                this.props.selectHandler({
                    error: false,
                    data: {
                        book: this.props.book,
                        data: data
                    }
                })
            })
            .catch(err => {
                Swal.fire({
                    title: `Book Update`,
                    text: `Failed: ${err.message}`,
                    icon: 'error'
                });
                this.props.selectHandler({
                    error: true,
                    data: {
                        data: err,
                        book: {}
                    }
                })
            })
    }

  render() {
    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${typeof(this.state.book.imageLinks) !== 'undefined' && this.state.book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <Action book={this.state.book} handleSelect={this.handle} />
            </div>
            </div>
            <Link to={`/book/${this.state.book.title}`} className="book-title-link">{this.state.book.title}</Link>
            <div className="book-authors">{ this.state.book.authors }</div>
        </div>
    )
  }
  
}

// BookCard.propType = {
//     selectHandler: PropTypes.func.isRequired,
//     book: PropTypes.exact({
//         title: PropTypes.string.isRequired,
//         authors: PropTypes.string.isRequired,
//         imageLinks: PropTypes.object.isRequired
//     }),
// }