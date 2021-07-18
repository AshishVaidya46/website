/*import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function PaymentAPI() {
    const [session, setSession] = useState({});
    const location = useLocation();
    const sessionId = location.search.replace('?session_id=', '');

    useEffect(() => {
        async function fetchSession() {
          setSession(
            await fetch('/api/checkout-session?sessionId=' + sessionId).then((res) =>
              res.json()
            )
          );
        }
        fetchSession();
      }, [sessionId]);
    
    return ({
        session:[session, setSession]
    });
}

export default PaymentAPI;*/