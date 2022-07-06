import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { get } from "../BooksAPI";

export default function ViewBook() {
    const [book, setBook] = useState({});
    let { id } = useParams();
    
    useEffect(() => {
        console.log(id)
        get(id)
            .then(data => {
                console.log(data)
                setBook(data);
                console.log(book)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
  return (
    <div>ViewBook</div>
  )
}