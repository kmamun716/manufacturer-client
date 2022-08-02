import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Navbar from '../../Navbar/Navbar';

const Header = () => {   
    const location = useLocation();
    const [user] = useAuthState(auth);

    const menuItem = <>
        {user? <>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><p 
                    className='text-red-500' 
                    onClick={()=>{
                        signOut(auth)
                        localStorage.removeItem('accessToken')
                    }}
                >Log Out</p>
            </li>
        </> : location.pathname !=='/login' ? <li> <Link to='/login'>Login</Link> </li>: ''} 
    </>;

    return (
        <div>
            <Navbar menuItem={menuItem}/>
        </div>
    );
};

export default Header;