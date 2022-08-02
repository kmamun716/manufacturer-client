import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BusinessSubSection = ({business}) => {
    const {icon, number, text} = business;
    return (
        <div className='text-center'>
            <FontAwesomeIcon className='text-4xl text-accent' icon={icon}/>
            <h1 className="text-4xl my-2 font-extrabold">{number}</h1>
            <h5 className="text-xl text-accent">{text}</h5>
        </div>
    );
};

export default BusinessSubSection;