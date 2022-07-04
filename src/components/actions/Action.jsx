import PropTypes from 'prop-types'
import React, { Component } from 'react'
// import * as BooksAPI from '../../BooksAPI'

export default class Action extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    selectedValue: this.props.book.shelf
  }


  // updateShelf = (event) => {
  //   var selectedValue = this.props.selectedValue;
  //   selectedValue(event);
  //   // BooksAPI.update(this.props.book, event.target.value)
  //   //   .then(data => {
  //   //     console.log(data)
  //   //   })
  //   //   .catch(err => console.log(err));
  //   // this.setState({
  //   //   selectedValue: event.target.value
  //   // })
  //   // console.log(event.target.value)
  // }
  render() {
    return (
      <select value={this.state.selectedValue} onChange={this.props.handleSelect}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}
