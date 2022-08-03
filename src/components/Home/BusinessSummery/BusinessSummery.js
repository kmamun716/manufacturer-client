import { faFlag, faLandmark, faListCheck, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import BusinessSubSection from './BusinessSubSection';

const BusinessSummery = () => {
    const businessSection = [
        {
            id: 1,
            icon: faFlag,
            number:'72',
            text:'Countries'
        },
        {
            id: 2,
            icon: faListCheck,
            number:'59+',
            text:'Complete Project'
        },
        {
            id: 3,
            icon:faPeopleGroup,
            number:'405+',
            text:'Happy Client'
        },
        {
            id: 4,
            icon: faLandmark,
            number:'432+',
            text:'Feedbacks'
        },
    ]
    return (
        <section className='flex flex-col items-center my-6 py-8 bg-transparent'>
            <div className='text-center'>
                <h2 className="text-4xl font-extrabold uppercase text-accent">Millions Business Trust Us</h2>
                <p className='text-xl pt-2 uppercase'>Try to make best product in the world!</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-44 py-24'>
                {
                    businessSection.map(business=><BusinessSubSection key={business.id} business={business} />)
                }
            </div>
        </section>
    );
};

export default BusinessSummery;