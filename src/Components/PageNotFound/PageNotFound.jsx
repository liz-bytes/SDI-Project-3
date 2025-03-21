import { Link } from 'react-router-dom';
import React from 'react';

function PageNotFound() {
  return (
  <>
  <h1>ERROR 404!</h1>
  <p>The page you are looking for was not found!</p>
  <Link to={"/"}>
        <button>Return Home</button>
  </Link>
  </>
  )
}

export default PageNotFound;