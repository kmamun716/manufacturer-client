import React from 'react';

const SocialLogin = ({signInWithXXX, text}) => {
    return (
        <button onClick={()=>signInWithXXX()} className="btn btn-block">{text}</button>
    );
};

export default SocialLogin;