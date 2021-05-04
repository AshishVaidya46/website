import React, {useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] =useState([])

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id,products])

    if(detailProduct.length === 0) return null;
    
    return (
        <>
        <div className="detail">
            <img src={detailProduct.images.url} alt="" />
            <div className="box-detail">
                <div className="row">
                    <h4>{detailProduct.title}</h4>
                    <h6>{detailProduct.product_id}</h6>
                </div>
                <span>₹ {detailProduct.price}</span>
                <h6>{detailProduct.description}</h6>
                <h6>{detailProduct.content}</h6>
                <p>Sold: {detailProduct.sold}</p>
                <Link to ="/cart" className="cart"
                onClick={() => addCart(detailProduct)}>
                <h6>Add To Cart</h6>
                </Link>
            </div>
        </div>

        <div>
            <h2>Related products</h2>
            <div className="products">
                {
                    products.map(product => {
                        return product.category === detailProduct.category
                         ?<ProductItem key={product._id} product={product} /> : null
                    })
                }
            </div>
        </div>
        </>
    );
}

export default DetailProduct;