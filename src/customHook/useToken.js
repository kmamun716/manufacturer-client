import { useEffect, useState } from "react";
const useToken=user=>{
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        const email = user?.email;    
        if(user?.photoURL){
            setCurrentUser({email: email, img: user.photoURL})
        }else{
            setCurrentUser({email: email})
        }
        if(email){
            fetch(`http://localhost:4000/mf/addUser/${email}`,{
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