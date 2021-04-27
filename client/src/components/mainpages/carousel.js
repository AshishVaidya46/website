import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

class Swiper extends React.Component {
    render(){
        return(
            <Carousel fade>
<Carousel.Item>
  <img
    className="d-block w-100"
    src= "https://images.hdqwalls.com/wallpapers/lamborghini-sian-2019-front-view-4k-qh.jpg"
    alt="First slide"
  />
  <Carousel.Caption>
    <h3>First slide label</h3>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://mcdn.wallpapersafari.com/medium/41/94/qsxEU7.jpg"
    alt="Second slide"
  />

  <Carousel.Caption>
    <h3>Second slide label</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://cdn.motor1.com/images/mgl/nBxBl/s3/lambo-batmobile.webp"
    alt="Third slide"
  />

  <Carousel.Caption>
    <h3>Third slide label</h3>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
  </Carousel.Caption>
</Carousel.Item>  
</Carousel>
        );
    }

}
export default Swiper