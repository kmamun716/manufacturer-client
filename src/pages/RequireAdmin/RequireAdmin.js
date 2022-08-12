import { useQuery } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';
import auth from '../../firebase.init';

const RequireAdmin = (props) => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    const {data, isLoading} = useQuery(['user'],()=>fetch(`https://powerful-oasis-61993.herokuapp.com/mf/user/${user?.email}`).then(res=>res.json()))
    if(isLoading){
        return <Loading/>
    }
    if (data.role!=='admin') {
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return props.children;
};

export default RequireAdmin;