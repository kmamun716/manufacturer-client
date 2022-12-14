import { useEffect, useState } from "react";

const useGetUser = user=>{
    const [registeredUser, setRegisteredUser] = useState({});
    useEffect(()=>{
        fetch(`https://powerful-oasis-61993.herokuapp.com/mf/user/${user?.email}`)
        .then(res=>res.json())
        .then(data=>setRegisteredUser(data))
    },[user])
    return [registeredUser]
}

export default useGetUser;