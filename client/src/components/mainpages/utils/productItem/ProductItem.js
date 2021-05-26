import React from 'react';
import BtnRender from './BtnRender';
import {Card} from 'react-bootstrap'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

        return (
            <Card style={{ width: '18rem' }} >
            {
                        isAdmin && <input type="checkbox" checked={product.checked} 
                            onChange={() => handleCheck(product._id)}
                        />
                    }
              <Card.Img variant="top" src={product.images.url} alt={product.images.url}/>
              <Card.Body >
                <Card.Title>{product.title}</Card.Title>
                 <div className="row justify-content-between mx-0">
                                <h6 className="text-danger">₹{product.price}</h6>
                                
                            </div>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Link>{product.content}</Card.Link>
                <div aria-disabled={product.inStock === 0}>

                    <BtnRender product={product} deleteProduct={deleteProduct} />
                </div>
              </Card.Body>
            </Card>
    );
}

export default ProductItem;