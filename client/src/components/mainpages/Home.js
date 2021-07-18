import React from 'react';
import Filters from './product/Filters';
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <Filters /> 
            <img className="home_imge" 
                src= "https://t4.ftcdn.net/jpg/02/92/56/91/360_F_292569116_Phht4uRj1YIuLFgBhrLu8171npBOcJcr.jpg"
                alt=""
            />
            <div className="container">
                <div className="row card-container ">
                <div className=" col-lg-4 col-md-4 col-4">
                <Link to='/'>
                    <Card style={{width: '100%'}} className="bg-dark card text-white">
                    <Card.Img src="https://il5.picdn.net/shutterstock/videos/4194139/thumb/1.jpg" alt="https://il5.picdn.net/shutterstock/videos/4194139/thumb/1.jpg" />
                    <Card.ImgOverlay>
                        <Card.Title className="row title">All Products</Card.Title>
                    </Card.ImgOverlay>
                    </Card>
                </Link>
                </div>
<div className="col-lg-4 col-md-4 col-4">
<Link to={`/products/${'apple'}`}>
<Card className="bg-dark  text-white">
  <Card.Img src="https://images5.alphacoders.com/853/853179.jpg" alt="https://images5.alphacoders.com/853/853179.jpg" />
  <Card.ImgOverlay>
    <Card.Title className="row title">Apple</Card.Title>
  </Card.ImgOverlay>
</Card>
</Link>
</div>
<div className="col-lg-4 col-md-4 col-4">
<Link to={`/products/${'Women'}`}>
<Card className="bg-dark  text-white">
  <Card.Img src="https://wallpapercave.com/wp/wp1890320.jpg" alt="https://wallpapercave.com/wp/wp1890320.jpg" />
  <Card.ImgOverlay>
    <Card.Title className="row title">Women</Card.Title>
  </Card.ImgOverlay>
</Card></Link>
</div>
                </div>
                <div className="row card-container mt-10">
                <div className="col-lg-6 col-md-6 col-6 ">
                <Link to={`/products/${'laptop'}`}>
                <Card className="bg-dark  text-white">
  <Card.Img src="https://reetifashions.com/wp-content/uploads/2017/06/artificial-imitation-jewellery-gorgeous-brilliant-copper-base-necklace-set.jpg" alt="https://reetifashions.com/wp-content/uploads/2017/06/artificial-imitation-jewellery-gorgeous-brilliant-copper-base-necklace-set.jpg" />
  <Card.ImgOverlay>
    <Card.Title className="row title">Laptop</Card.Title>
  </Card.ImgOverlay>
</Card>
                </Link>
</div>
<div className="col-lg-6 col-md-6 col-6 ">
<Card className="bg-dark  text-white">
  <Card.Img src="https://ae01.alicdn.com/kf/HTB1XZVmgAZmBKNjSZPiq6xFNVXao/Fashion-Jewelry-Statement-Necklace-Women-Big-Tassel-Wedding-Choker-Necklace-Luxury-Rhinestone-Choker-Crystal-Collier-2017.jpg" alt="https://ae01.alicdn.com/kf/HTB1XZVmgAZmBKNjSZPiq6xFNVXao/Fashion-Jewelry-Statement-Necklace-Women-Big-Tassel-Wedding-Choker-Necklace-Luxury-Rhinestone-Choker-Crystal-Collier-2017.jpg" />
  <Card.ImgOverlay>
    <Card.Title className="row title">Apple</Card.Title>
  </Card.ImgOverlay>
</Card>
</div>
                </div> 
            </div>
           
        </div>
    );
}

export default Home;