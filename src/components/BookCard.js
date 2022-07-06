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
        let updatedBook = {
            ...this.props.book,
            shelf: e.target.value
        }
        this.setState({
            book: updatedBook
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
                        book: updatedBook,
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