import {useState, useEffect} from 'react';
import axios from 'axios';


function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [userID, setUserID] = useState('')
    const [history, setHistory] = useState([])
    const [callback, setCallback] =useState(false)
    const [user, setUser] = useState('') 
    const [users,setUsers] = useState([])
    const [total, setTotal ] = useState(0)

    useEffect(() => {
        if(token) {
            const getUser = async () =>{
                    if(isAdmin){
                        const res = await axios.get('/user/users_info', {
                        headers: {Authorization: token}
                    })
                    setUsers(res.data)
                    }else{
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setUser(res.data)
                    
                    setUserID(res.data._id)

                    setCart(res.data.cart)
                }
                
            }
            getUser()
        }
    }, [token, isAdmin])
 
    useEffect(() => {
        if(token) {
            const getHistory = async () =>{
                if(isAdmin){
                    const res = await axios.get('/api/checkout', {
                        token
                    })
                    setHistory(res.data) 
                }else{
                    
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                    
                }
            }
            getHistory()
        }
    }, [token, isAdmin])

    useEffect(() => {

        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }
        getTotal()
    },[cart, setTotal])


    const addCart = async (product) => {
        
        if(!isLogged){
            return alert("Please login to continue buying")
        } 

        const check = cart.every(item =>{
            return item._id !== product._id
        })
        if(check){
            setCart([...cart, {...product, quantity:1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product,quantity: 1}]}, {
                headers: {Authorization: token}
            })
        }
    }

    return ({
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        userID: [userID, setUserID],
        history:[history, setHistory],
        callback: [callback, setCallback] ,
        user: [user, setUser],
        users:[users, setUsers],
        total: [total, setTotal]
    });
}

export default UserAPI;