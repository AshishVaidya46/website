import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [isLogged] = state.userAPI.isLogged
    const addCart = state.userAPI.addCart
    const [add , setAdd] =useState(false)

    const handleAdd = () => {
        setAdd(true)
    }

    return (
        <div className="row_btn">
            {
                isAdmin ?
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() => deleteProduct(product._id, product.images.public_id)}>
                       <button style={{color:'white'}}>Delete</button> 
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                       <button style={{color:'white'}}>Edit</button> 
                    </Link>
                </>
                : <>
                    {
                        add ? 
                        <Link id="btn_buy" to='/cart'>
                           <button style={{color:'white'}}>Go to Cart</button>
                        </Link>
                        :
                        isLogged ?
                        <Link id="btn_buy" to="#!"  onClick={() => addCart(product)}>
                            <button style={{color:'white'}} onClick={handleAdd}>Add to Cart</button>
                        </Link>
                        :<Link id="btn_buy" to="/login">
                            <button style={{color:'white'}}>Add to Cart</button>
                        </Link>
                    }
                    
                </>
            }
        </div>
    );
}

export default BtnRender;