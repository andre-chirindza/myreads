import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Routes from './BookRoutes'

ReactDOM.render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>,
    document.getElementById('root')
)
