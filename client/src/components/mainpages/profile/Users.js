import React, { useContext } from 'react';
import {GlobalState} from '../../../GlobalState';
//import {Link}  from 'react-router-dom'
import Success from '../../headers/icon/success.svg'
import Close from '../../headers/icon/close.svg'
//import axios from 'axios';

function Users() {
    const state = useContext(GlobalState)
    //const [token] = state.token
    const [users] = state.userAPI.users
    //const [history] = state.userAPI.history

    if(!users) return null;
//console.log(user)
    return (
        <div className="table-responsive">
            <title>Users</title>

            <table className="table w-100">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((items, index) => (
                            <tr key={items._id} style={{cursor: 'pointer'}}>
                                <th>{index + 1}</th>
                                <th >{items._id}</th>
                                <th>{items.name}</th>
                                <th>{items.email}</th>
                                <th>
                                
                                { 
                                        items.role === 1
                                        ?  <img src={Success} alt={Success}  
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />

                                        :<img src={Close} alt={Close} 
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />
                                    }
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Users;