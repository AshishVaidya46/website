import React, { useContext, useState } from 'react';
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function Header() {
   const state = useContext(GlobalState)
   const [isLogged] = state.userAPI.isLogged
   const [isAdmin] = state.userAPI.isAdmin
   const [cart] = state.userAPI.cart
   const [userName] =state.userAPI.userName
   const [menu, setMenu] = useState(false)


   const logoutUser = async () =>{
       await axios.get('/user/logout')
       localStorage.getItem('firstLogin')
       window.location.href = "/"
   }

   const adminRouter = () =>{
       return(
           <>
               <li ><Link to="/create_product" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>Create Product</Link></li>
               <li ><Link to="/category" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>Catogories</Link></li>
           </>
       )
   }
   const loggedRouter = () =>{
    return(
      <>
      <li><Link to="/profile" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>{userName}</Link></li>
      <li><Link to="/history" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>History</Link></li>
      <li><Link to="/" onClick={logoutUser}  style={{ textDecoration: 'none', color:'black' }}>Logout</Link></li>
      </>
    )
  }


  const styleMenu = {
    left: menu ? 0 : "-100%"
  }
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>
            <div class="brand">
                <h2>
                   {isAdmin ? 'Admin' : "V-Eats" }
                </h2>
            </div>
            <>
      </>
            <ul className="nav justify-content-end" style={styleMenu}>
                <li><Link to="/" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>{isAdmin ? 'Products' : 'Home'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li class="nav-item"><Link to="/login" onClick={() => setMenu(!menu)} style={{ textDecoration: 'none', color:'black' }}>Login OR Register</Link></li>
                }
                
                <li onClick={() => setMenu(!menu)}>
                   <img src={Close} alt="" width="30" className="menu" />
                </li>
            

            {
                isAdmin ? ''
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to ="/cart" onClick={() => setMenu(!menu)}>
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            </ul>
        </header>
    );
}

export default Header;