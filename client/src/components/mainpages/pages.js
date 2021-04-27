import React, { useContext } from 'react';
import {Switch, Route} from 'react-router-dom';
import Products from './product/Products';
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct'
import Profile from './profile/Profile'
import {GlobalState} from '../../GlobalState'

function pages() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/profile" exact component={isLogged ? Profile : Login} />

            <Route path="/cart" exact component={isLogged ? Cart : Login} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />


            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={NotFound} />
        </Switch>
        
    );
}

export default pages;