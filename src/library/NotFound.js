import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

const NotFound = (props) => {
  return (
    <Jumbotron>
      <Container>
        <h1>Oops! - This page was not found</h1>
        <p className='lead'>Please report to system administrator</p>
      </Container>
    </Jumbotron>
  )
}

export default NotFound
