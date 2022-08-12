import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/images/404-error-page-not-found.jpg';

const NotFound = () => {
    return (
        <div className='flex justify-around items-center'>
            <div className='w-1/2'>
                <img src={notFound} alt='Page Not Found' />
            </div>
            <div className='text-2xl font-bold'>
                Please go to <Link className='text-primary' to='/'>Home Page</Link>
            </div>
        </div>
    );
};

export default NotFound;