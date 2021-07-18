import React, {useContext, useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import BtnRender from '../utils/productItem/BtnRender';
import Back from '../../headers/icon/back.svg'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [tab, setTab] = useState(0)
    //const addCart = state.userAPI.addCart
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
        <div className="container box">
                <img style={{position: 'relative', width:'28px', marginTop:'5px'}} onClick={() => {window.history.back()}} src={Back} alt={Back} />

            <div className="title">
                <h5>{detailProduct.title}</h5>
                <h6>{detailProduct.description}</h6>
            </div>
            <div className="detail-img">
                <img src={detailProduct.images[tab].url} alt={detailProduct.images[tab].url}
                    className="d-block img-thumbnil rounded mt-4 w-100%"
                    style={{height: '350px'}} /> 
            </div>
            <div className="row d-flex justify-content-around mx-0 col-md-3 col-lg-4 ">
                {
                detailProduct.images.map((img, index) => (
                    <img key={index} src={img.url} alt={img.url}
                        className="img-thumbnail rounded"
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)}
                    />
                ))
                }
            </div> 

            <div className=" box-detail">
                <span>₹ {detailProduct.price}</span>
                <h5>@{detailProduct.content}</h5>
                <p>Sold: {detailProduct.sold}</p>
                <p className="text-warning">Delivered within 1 week</p>
                <BtnRender product={detailProduct}/>
            </div>

            <div>
                <h2>Related products</h2>
                 <div className="products row ml-1">
                    {
                        products.map(product => {
                        return product.category === detailProduct.category
                        ?<ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;