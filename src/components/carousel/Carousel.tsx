import { Carousel } from 'antd';
import React from 'react';
import styles from './Carousel.module.css';


import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";
const Carousel123: React.FC = () => {
  return(
    <Carousel autoplay className='slider'>

    <img src={carouselImage1} alt="" />
    <img src={carouselImage2} alt="" />
    <img src={carouselImage3} alt="" />
  </Carousel>
  )
  };
export default Carousel123;
