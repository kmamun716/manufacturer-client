import { useQuery } from '@tanstack/react-query';
import React from "react";
import Loading from '../../shared/Loading/Loading';
import Service from "../Service/Service";

const Services = () => { 
  const {data:services, isLoading} = useQuery(['services'],()=>fetch("https://powerful-oasis-61993.herokuapp.com/mf/services").then(res=>res.json()));
  if(isLoading){
    return <Loading/>
  }
  return (
    <div>
      <h2 className="text-3xl text-center font-bold my-4">Our Services</h2>
      <div className="flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services?.map(service => (
          <Service key={service._id} service={service} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Services;
