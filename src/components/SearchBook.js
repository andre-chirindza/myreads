// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import { getAll, search } from '../BooksAPI'

export default class SearchBook extends Component {
    //   static propTypes = {second: third}
    async componentDidMount() {
        this.setState({
            books: await getAll()
        })
    }

    state = {
        query: '',
        searchedBooks: [],
        books: []
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
        
        this.state.query !== '' && this.getBooks(this.state.query)

    }

    /**
     * Search books using terms
     * @argument {string} query
     */
    getBooks = (query) => {
        try {
            if (query) {

                search(query).then(data => {

                    if (typeof (data.error) !== 'undefined') {
                        this.setState({
                            searchedBooks: []
                        })
                    } else {
                        let { books } = this.state;
                        let noneBooks = this.equalElements(data, books, false);
                        let sheltedBooks = this.equalElements(data, books, true);
                        
                        noneBooks.map(book => book.shelf = 'none')
                        
                        this.setState({
                            searchedBooks: [...sheltedBooks,...noneBooks]
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

    /**
     * 
     * @param {Array} firstArray 
     * @param {Array} secondArray 
     * @param {Boolean} value 
     * @returns
     * @copyright Borislav Hadzhiev 
     * @version Getting Difference between two Array of Objects in JavaScript
     * @link https://bobbyhadz.com/blog/javascript-get-diference-between-two-arrays-of-objects
     */
    equalElements = (firstArray, secondArray, value) => {
        return firstArray.filter(book => {
            if (value) {
                return secondArray.some(searchBook => {
                    book.shelf = searchBook.shelf;
                    return searchBook.id === book.id
                })
            } else {
                return !secondArray.some(searchBook => {
                    book.shelf = searchBook.shelf;
                    return searchBook.id === book.id
                }) 
            }
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.inputChange} value={this.state.query} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {console.log(this.state.searchedBooks)}
                        {this.state.searchedBooks.map(book => {
                            return <li key={book.id}><BookCard book={book} selectHandler={this.selectHandler} /></li>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}
