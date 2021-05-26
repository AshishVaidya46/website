import React, { useContext } from 'react';
import {GlobalState} from '../../GlobalState';
import Cart from './icon/cart.svg';
import axios from 'axios';
import userImg from './icon/user.svg'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



function Header() {
   const state = useContext(GlobalState)
   const [isLogged] = state.userAPI.isLogged
   const [isAdmin] = state.userAPI.isAdmin
   const [cart] = state.userAPI.cart
   const [user] =state.userAPI.user

   const logoutUser = async () =>{
       await axios.get('/user/logout')
       localStorage.getItem('firstLogin')
       window.location.href = "/"
   }

   const adminRouter = () =>{
       return(
           <>
               <Nav.Link href="/create_product">Create Product</Nav.Link>
               <Nav.Link href="/category" >Catogories</Nav.Link>
           </>
       )
   }
   const loggedRouter = () =>{
    return(
      <>
        <NavDropdown title={isAdmin ? 'Admin' : user.name} id="basic-nav-dropdown">
        <img src={userImg} alt={userImg} 
                    style={{
                        borderRadius: '50%', width: '28px', height: '28px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }} /> <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    {
                        isAdmin &&  <NavDropdown.Item href="/user_info">Users</NavDropdown.Item>
                    }
            <NavDropdown.Divider />
             <NavDropdown.Item href="/" onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown>
        
      </>
    )
  }


    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Elegnate</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-end" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto"> </Nav> 

      <Nav.Link href="/">{isAdmin ? 'Products' : 'Home'}</Nav.Link>
      {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <Nav.Link href="/login">Login OR Register</Nav.Link>
                }
           {
                isAdmin ? ''
                :        <Nav.Link  href="/cart">
                                <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                                    <span className="position-absolute"
                                    style={{
                                        padding: '3px 6px',
                                        background: '#ed143dc2',
                                        borderRadius: '50%',
                                        top: '-10px',
                                        right: '-10px',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>
                                        {cart.length}
                                    </span>
                                </i> <img src={Cart} alt={Cart} width='25'/>
                        </Nav.Link>
            }
  </Navbar.Collapse>
</Navbar>


    );
}

export default Header;