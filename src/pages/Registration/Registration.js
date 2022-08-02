import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading/Loading';
import SocialLogin from '../../components/shared/SocialLogin/SocialLogin';
import useToken from '../../customHook/useToken';
import auth from '../../firebase.init';

const Registration = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [ createUserWithEmailAndPassword, eUser, eLoading, eError ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user || eUser);
    let signUpErrorMessage;
    let passwordMatchinError;

    useEffect(()=>{
        if(token){
            navigate('/dashboard')
        }
    },[token, navigate])
    const onSubmit=async data=>{
        if(data){
            const {name, email, password, confirmPassword} = data;
            if(password === confirmPassword){
                passwordMatchinError='';
                await createUserWithEmailAndPassword(email, password);
                await updateProfile({ displayName: name });
                
            } else {
                passwordMatchinError= <p className="text-red-500 font-bold">password not matched</p>
            }
        }
    }
    if(loading || updating || eLoading){
        return <Loading />
    }
    if(error || updateError || eError ){
        const erroMessage = error?.message || updateError?.message;
        const splitErrorMessage = erroMessage.split(":");
        signUpErrorMessage = <p className="text-red-500 font-bold">{splitErrorMessage[1]}</p>
      }
    return (
        <div className="flex flex-col justify-center items-center border-opacity-50 h-screen">
      <h2 className="text-2xl font-bold text-center">Register Here</h2>
      <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-2 max-w-xs">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control w-full mb-2 max-w-xs">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Your Valid Email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control w-full mb-2 max-w-xs">
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div className="form-control w-full mb-2 max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Password:</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
              />
              {passwordMatchinError}
              {errors.confirmPassword && (
                <span className="text-red-500">Confirm Password is required</span>
              )}
            </div>
            {signUpErrorMessage}
            <input type="submit" value="Login" className="btn btn-block" />
          </form>
        </div>
      </div>      
        <p>Already Have an Account? <Link to='/login' className="text-primary">Login Here</Link></p>
      <div className="divider">OR</div>
      <SocialLogin signInWithXXX={signInWithGoogle} text='Login with Google' />
      </div>
    </div>
    );
};

export default Registration;