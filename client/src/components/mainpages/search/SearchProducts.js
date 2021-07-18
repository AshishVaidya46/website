import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import axios from 'axios';
import Loading from '../utils/loading/Loading';
import Back from '../../headers/icon/back.svg'


function SearchProducts() {
    const state = useContext(GlobalState)
    const [products, setProducts] = useState([])
    const params = useParams();
    const [isAdmin] = state.userAPI.isAdmin
    const [token] =state.token
    const [callback, setCallback] = state.productAPI.callback
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = state.productAPI.sort



    useEffect(() => {
        const getProduct = async() => {
            setLoading(true)
            const res = await axios.get('/api/products')
            setProducts ( res.data.products.filter(product => {
                return product.category === params.name
            })
            )    
            setLoading(false)   
         }
    getProduct();

    },[params.name, sort])
console.log(sort)
    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }
    const deleteProduct = async(id, public_id) => {
        console.log({id, public_id})
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id}, {
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    if(loading) return <div className="products"><Loading /></div>

    return (
        <div className="container">
        <img style={{position: 'relative', width:'28px', marginTop:'5px'}} onClick={() => {window.history.back()}} src={Back} alt={Back} />
        <h2> {products.length === 0 ? <p>No search found!!</p>
            :params.name}</h2>
            {
                products.length === 0 ?''
            :<div className="filter_menu">
        <div className="row category">    
        <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value= ''>Newest</option>
                <option value= 'sort=oldest'>Oldest</option>
                <option value= 'sort=sold'>Best Sales</option>
                <option value= 'sort=-price'>Price: High-Low</option>
                <option value= 'sort=price'>Price: Low-High</option>
            </select>
        </div>
    </div>
            }
        <div className="products ml-1  row">
        {
            products.map(product => {
                return <ProductItem key={product._id} product={product} 
                isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck}/>
            })
        }
        </div>
</div>
    );
}

export default SearchProducts;