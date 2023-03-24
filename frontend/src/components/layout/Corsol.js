import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
const Corsol = () => {
    
  return (
    <div> <Carousel>
    <Carousel.Item>
      <img 
        className="d-block w-100 h-200"
        src="/images/first.jpg"
        alt="First slide"
        style={{height:"400px"}}
      />
     
      <Carousel.Caption>
        <h3>Get the exited product</h3>
        <p>Headphon are on 30% descount</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img 
        className="d-block w-100"
        src="/images/secend.jpg"
        alt="Second slide"
        style={{height:"400px"}}
      />

      <Carousel.Caption>
        <h3>New offer</h3>
        <p>get the product on discounted price</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img 
        className="d-block w-100"
        src="/images/third.jpg"
        alt="Third slide"
        style={{height:"400px"}}
      />

      <Carousel.Caption>
        <h3>Biggest sale</h3>
        <p>
        Get amazing products on our website
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel></div>
  )
}

export default Corsol