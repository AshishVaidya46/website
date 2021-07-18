import React, {useContext, useState} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';


function Product() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] =state.token
    const [callback, setCallback] = state.productAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

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
    
    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    /*const filterItem = async(categItem) => {
        const items = await axios.get('/api/products')
        setLoading(true)

        if(categItem === 'All'){
            setProducts(items.data.products)
        }else{
        const updateItem = items.data.products.filter(curItem => {
            //console.log(curItem)
            return curItem.category === categItem;
        });
        setProducts(updateItem)
       }
       setLoading(false)
    }*/
    

    if(loading) return <div className="products"><Loading /></div>
    return (
        <>
         
        <Filters />
    
        <img className="home_imge" 
                    src= "https://t4.ftcdn.net/jpg/02/92/56/91/360_F_292569116_Phht4uRj1YIuLFgBhrLu8171npBOcJcr.jpg"
                    alt=""
                />


        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>{isCheck ? 'Delete All' : 'Delete'}</button>
            </div>
        }

        <div className="container">
        <div className="products ml-1 row">
        {
            products.map(product => {
                return <ProductItem key={product._id} product={product} 
                isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck}/>
            })
        }
        </div>
</div>
        <LoadMore />
        {products.length === 0 && <Loading />}
        </>
    );
}

export default Product;



/*<div className=" container" style={{
            borderBottom: '1px solid crimson',
            paddingBottom: '6px'
            }}>
            <div className="row_category" >
                <button style={{color: 'crimson'}} onClick={() => filterItem('All')}>All</button>
                <button style={{color: 'crimson'}} onClick={() => filterItem('laptop')}>laptop</button>
                <button style={{color: 'crimson'}} onClick={() => filterItem('apple')}>apple</button>
                <button style={{color: 'crimson'}} onClick={() => filterItem('Women')}>Women</button>
            </div>
        </div>*/