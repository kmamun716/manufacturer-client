import { useEffect, useState } from "react";
const useToken=user=>{
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        const email = user?.email;    
        const name = user?.displayName;
        if(user?.photoURL){
            setCurrentUser({email: email, name, img: user.photoURL})
        }else{
            setCurrentUser({email: email, name})
        }
        if(email){
            fetch(`https://powerful-oasis-61993.herokuapp.com/mf/addUser/${email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                const token = data.accessToken;
                localStorage.setItem('accessToken', token)
                setToken(token)
            })
        }
    },[user])
    return[token];
}

export default useToken;