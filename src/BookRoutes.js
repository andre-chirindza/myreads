import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import SearchBook from "./components/SearchBook";
import ViewBook from "./components/ViewBook";

export default class BookRoutes extends Component {
  render() {
    return (
      <div className="app">
        <div className="listBooks">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Routes>
          <Route exact path="/" element={<App />}></Route>
          <Route path="/search" element={<SearchBook />}></Route>
          <Route path="/book/:id" element={<ViewBook />}></Route>
        </Routes>
        </div>
      </div>
    );
  }
}
