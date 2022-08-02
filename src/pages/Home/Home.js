import React from 'react';
import Banner from '../../components/Home/Banner/Banner';
import BusinessSummery from '../../components/Home/BusinessSummery/BusinessSummery';
import Reviews from '../../components/Home/Reviews/Reviews';
import Services from '../../components/Home/Services/Services';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Services/>
            <BusinessSummery/>
            <Reviews/>
        </div>
    );
};

export default Home;