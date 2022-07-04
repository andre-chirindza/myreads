// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import * as BooksAPI from '../BooksAPI'

export default class SearchBook extends Component {
    //   static propTypes = {second: third}

    state = {
        query: '',
        searchedBooks: []
    }

    selectHandler = (response) => {
        if (!response.error) {
            this.setState({
                query: ''
            })
            this.getBooks('')
            console.log(response);
        }
    }

    inputChange = async (event) => {
        this.setState({
            query: event.target.value,
        })

        this.getBooks(this.state.query)

    }

    /**
     * Search books using terms
     * @argument {string} query
     */
    getBooks = (query) => {
        try {
            if (query) {

                BooksAPI.search(query).then(data => {

                    if (typeof (data.error) !== 'undefined') {
                        this.setState({
                            searchedBooks: []
                        })
                    } else {
                        this.setState({
                            searchedBooks: data
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
            this.setState({
                searchedBooks: []
            })
        } catch (error) {
            this.setState({
                searchedBooks: []
            });
        }


    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
    */}
                        <input type="text" placeholder="Search by title or author" onChange={this.inputChange} value={this.state.query} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.map(book => {
                            return <li key={book.id}><BookCard book={book} selectHandler={this.selectHandler} /></li>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}
