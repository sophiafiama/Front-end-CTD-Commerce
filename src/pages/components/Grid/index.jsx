import './index.scss';
import api from '../../../services/api';
import CardProduct from './CardProduct';
import Filter from '../Filter';

import { Container, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';

export default function CardGrid() {

  const [ products, setProducts ] = useState([]);
  const [ filterInfo, setFilterInfo ] = useState({ url: '/products/filter/all'})
  const { filtered } = useParams();
  

  const callbackFilterInfo = (filterInfo) => {
    setFilterInfo({url: '/products/filter/' + filterInfo})
    
  }
  
  const gridProducts = useCallback(async () => {
    console.log("parametro da da url", filtered)
    try {

        const response = await api.get('/products/filter/' + filtered)
        setProducts(response.data);
        console.log(response.data);

    } catch (e) {
      console.log(e)
    }
  })

  useEffect(() => {
    console.log('filter info:', filterInfo.url)
        
    return gridProducts();
  }, [filtered]);
  
  return (
    <>
    
      <Filter  parentCallback={callbackFilterInfo}/>
      <Container className='justify-content-center align-items-center pt-5 pb-5 '>
        <Row xs={1} md={2} className='g-4'>
          {products.map( product => {
            return (
              <Col md={3} sm={4} xs={6}>
                <CardProduct
                  product={product}
                  id={product.id}
                  key={product.id}
                  img={product.image}
                  title={product.title}
                  price={product.price}
                  category={product.category.name}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
