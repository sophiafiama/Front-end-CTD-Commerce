import React from 'react';
import Card from 'react-bootstrap/Card'

export default function OneCard({ img, title, price, category}) {
    return (
      <>
      
        <Card>
          {<Card.Img src={img} />}
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">BRL {price}</Card.Subtitle>
          </Card.Body>
        </Card>
      </>
  
    )
  } 