import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    let from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        if(user){
            navigate(from, { replace: true });
        }
    },[user, from, navigate])

    return (
        <div>
            
        </div>
    );
};

export default Login;