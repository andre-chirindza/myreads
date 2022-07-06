import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Action extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    return (
      <select defaultChecked={`none`} value={this.props.book.shelf} onChange={this.props.handleSelect}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}
