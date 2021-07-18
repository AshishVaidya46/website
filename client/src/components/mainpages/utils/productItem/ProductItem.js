import React from 'react';
import BtnRender from './BtnRender';
import {Link} from 'react-router-dom';

//import {Card} from 'react-bootstrap'


function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

        return (
            <div className="product_card  col-lg-3 col-md-4 col-sm-6 col-6" >

            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <Link style={{textDecoration: 'none', color:'black'}} to={`/detail/${product._id}`}>

            <div className="product_box">
                <b title={product.title}>{product.title}</b>
                <br/>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
                <p>@{product.content}</p>
            </div>
            <div className="product_img">
                <img src={product.images[0].url} alt="" />
            </div>
            </Link>

            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>

    );
}

export default ProductItem;