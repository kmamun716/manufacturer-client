import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import useGetUser from '../../customHook/getUser';
import auth from '../../firebase.init';

const UserProfile = () => {
    const [user] = useAuthState(auth);
    const [registeredUser] = useGetUser(user);
    return (
        <div>
            <h2 className="text-2xl text-center">My Profile</h2>
            <div className='flex flex-col items-center'>
                <img width="250px" src={registeredUser?.img} alt={user?.displayName} />
                <Link className='btn btn-warning btn-xs my-2' to='/dashboard/upload-photo'>Change Image</Link>
                <p>Your Email: {user?.email}</p>
                <p>You are one of the <span className='text-secondary font-semibold'>{registeredUser?.role}</span> of this site.</p>
            </div>
        </div>
    );
};

export default UserProfile;