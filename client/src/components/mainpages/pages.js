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
import Users from './profile/Users'
import OrderDetails from './History/OrderDetails'
import Success from './cart/success'
import Canceled from './cart/canceled'
import SuccessCash from './cart/SuccessCash'
import Checkout from './checkout/Checkout';
import SearchProducts from './search/SearchProducts';
import Home from './Home'

function pages() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/home" exact component={Home}/>
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/cart/checkout/:id" exact component={isLogged ? Checkout : NotFound}/>

            <Route path="/profile" exact component={isLogged ? Profile : Login} />

             <Route path="/success/:id" exact component={isLogged ? Success : NotFound}/>
             <Route path="/canceled/:id" exact component={isLogged ? Canceled : NotFound} />
             <Route path="/success_cash/:id" exact component={isLogged ? SuccessCash : NotFound}/>

            <Route path="/cart" exact component={isLogged ? Cart : Login} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />
            
            <Route path="/products/:name" exact component={SearchProducts}/>
            <Route path="/user_info" exact component={isAdmin ? Users : NotFound} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/*" exact component={NotFound} />
        </Switch>
        
    );
}

export default pages;

