import productList from '../components/Grid/assets/API';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Button, Container, Image, Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import api from '../../services/api'
import './style.scss'

// const productListReduce = productList.reduce((acc, {id, ...restProduct})=>({
//   ...acc,
//   [id]: {id, ...restProduct} 
// }), {})


function SingleProduct() {

  const [product, setProduct] = useState({});

  const { singleProduct } = useParams();
  
useEffect(() => {
    async function loadProductData() {
      try {
        const response = await api.get(`products/${singleProduct}`);
        console.log(response.data)
        
        await setProduct({
          id: response.data.id,
          title: response.data.title,
          price: response.data.price,
          category: response.data.category.name,
          image: response.data.image,
          description: response.data.description
        });
      } catch (error) {
          console.log(error)
      }
    }
    loadProductData();
  }, [singleProduct]);



  let productsLocalStorage = localStorage.getItem("products");

  if(productsLocalStorage == null){
    productsLocalStorage = []
    localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  } else {
    productsLocalStorage = JSON.parse(localStorage.getItem("products"))
  }
  

  const addProductToLocalStorage = () => {
      productsLocalStorage.push(product);
      localStorage.setItem("products", JSON.stringify(productsLocalStorage));
  }

const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.1

    }

  };
const arrImage = [product.image, product.image,  product.image, product.image]

  
  return (
    <>
    <Container className="container-single-product">
      <h5 className="single-product-category mb-2">{product.category}</h5>
      <h1 className="single-product-title mb-5">{product.title}</h1>
          
            {/* <Container className='h-100' >
      <Card className='d-flex flex-column justify-content-end' > */}

        <Container className="container-tabs">
          <Tabs defaultActiveKey="overview" className="mb-3">
            <Tab eventKey="overview" title="Overview">
            <Container className="container-single-product-carousel">
              <Carousel responsive={responsive}>
                {arrImage.map((img, i) => {
                  return (
                    <div key={i} className="justify-content-center align-items-center single-product-image-div">
                        <Image className="single-product-image" src={img} rounded fluid/>
                    </div>
                  )
                })
                }
              </Carousel>
              </Container>
            </Tab>
            <Tab eventKey="description" title="Description">
            <Container className="container-single-product-carousel">
              <div className="p-3 me-auto justify-content-center single-product-description-div">
                <p>{product.description}</p>
              </div>
              
              
              </Container>
            </Tab>
          </Tabs>
        </Container>
        <style type="text/css">
          {`

          .btn-primary {
            background-color: #0ACF83;
            color: white;
            width: 100%;
            max-width: 326px;
            border-radius: 10px;
            padding: 1rem 0;
            font-family: DM Sans;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0.20000000298023224px;
            text-align: left;
            display: flex;
            justify-content: space-around;
            margin: 3rem auto;
            
          }
          `}
        </style>
        <Container className="container-add-to-cart">
          <Link style={{textDecoration: 'none'}}to={`/shoppingCart`}><Button variant="primary" onClick={addProductToLocalStorage}>Add to Cart</Button></Link>
        </Container>
      </Container>
    </>
  );   
}

export default SingleProduct;
