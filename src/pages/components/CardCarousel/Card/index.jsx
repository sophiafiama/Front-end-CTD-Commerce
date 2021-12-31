import React from 'react';
import { Card, Container } from 'react-bootstrap'
import './style.scss';

export default function OneCard({ image, title, price, category }) {

  return (
    <>
      <style type='text/css'>
        {`
        .no-style{
          text-decoration: none;
          color: black;          
        }
        .no-style:hover{
          color: #0cb876;          
        }
      `}
      </style>
      <Container className='h-100 p-0 m-0'>
        <Card className='card-product'>
          {<Card.Img src={image} variant='top'
            style={{
              maxHeight: '20vh',
              objectFit: 'contain',
              minHeight: '20vh',
            }} />}
          <Card.Body>
            <Card.Subtitle className="mb-2">{category}</Card.Subtitle>
            <Card.Title className='no-style'>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">BRL {price}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>

    </>

  )
}