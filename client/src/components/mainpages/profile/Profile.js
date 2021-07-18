import React,{ useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import {Link}  from 'react-router-dom'
import UserImg from '../../headers/icon/user.svg'
import Success from '../../headers/icon/success.svg'
import Close from '../../headers/icon/close.svg'



function Profile() {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [history] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className="profile_page">
            <title>Profile</title>
            <section className="row text-secondary my-3">
            <div className="container">
                <div className="col-md-4">
                <h3 className="text-center text-uppercase">
                        {isAdmin ? 'Admin Profile' : 'User Profile'}
                    </h3>
                <div className="avatar">
                        <img src={UserImg} 
                        alt="avatar" />
                        <span>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                            accept="image/*" />
                        </span>
                    </div>


            <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name"  className="form-control"
                        placeholder="Your name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" defaultValue={user.email} 
                        className="form-control" disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password"  className="form-control"
                        placeholder="Your new password"  />
                    </div>

                    <button className="btn btn-info" >
                        Update
                    </button>
                </div>

            <div className="history-page">
        <h3> your Orders</h3>

            <h5>You Have {history.length} ordered</h5>

            <table className="table-bordered table-hover w-100 text-uppercase"
                style={{minWidth: '600px', cursor: 'pointer'}}>
                    <thead className="bg-light font-weight-bold">
                        <tr>
                            <th className="p-2">ID</th>
                            <th className="p-2">Method</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">total</th>
                            <th className="p-2">Delivered</th>
                            <th className="p-2">Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        
                            history.map(items => (
                                //console.log(items)
                            
                                <tr key={items.user_id}>
                                {console.log(items)}
                                <td className="p-2">
                                <Link  to={`/history/${items._id}`}>{items.method === 'card' ? items.paymentID : items._id}</Link>
                                </td>
                                <td>{items.method}</td>
                                <td className="p-2">
                                <Link to={`/history/${items._id}`}>
                                {new Date(items.createdAt).toLocaleDateString()}
                                </Link>
                                </td>
                                
                                <td className="p-2">
                                {items.amount}
                                </td>
                                
                                <td className="p-2">
                                {
                                    items.delivered
                                        ? <img src={Success} alt={Success}  
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />
                                        : <img src={Close} alt={Close} 
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />
                                }
                                </td>
                                
                                <td className="p-2">
                                {
                                    items.paid === 'true'
                                        ? <img src={Success} alt={Success}  
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />
                                        : <img src={Close} alt={Close} 
                                        style={{borderRadius: '50%', width: '20px', height: '20px',
                                               transform: 'translateY(-3px)', marginRight: '3px' }} />
                                }
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            
        </div>
        </div>
        </section>

        </div>
        
    );
}

export default Profile;