import React from 'react'

function Canceled({history}) {
    return (
        <div>
            <h1> Payment failed</h1>
            <p>Payment was not successFul</p>
            <div>
                <button className="btn btn-dark m-2"
                onClick={() => history.push('/')}>
                Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default Canceled;