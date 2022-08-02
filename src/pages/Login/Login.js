import React, { useEffect } from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/shared/Loading/Loading";
import SocialLogin from "../../components/shared/SocialLogin/SocialLogin";
import useToken from "../../customHook/useToken";
import auth from "../../firebase.init";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, eUser, eLoading, eError] = useSignInWithEmailAndPassword(auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  let from = location.state?.from?.pathname || "/";
  let signInErrorMessage;

  const [token] = useToken(user || gUser || eUser);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if(loading || gLoading || eLoading){
    return <Loading/>
  }
  if(error || gError || eError){
    const erroMessage = error?.message || gError?.message || eError?.message;
    const splitErrorMessage = erroMessage.split(":");
    signInErrorMessage = <p className="text-red-500 font-bold">{splitErrorMessage[1]}</p>
  }

  const onSubmit = (data) => {
    if(data){
      const {email, password} = data;
      signInErrorMessage='';
      signInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border-opacity-50 h-screen">
      <h2 className="text-2xl font-bold text-center">Login Here</h2>
      <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {signInErrorMessage}
            <input type="submit" value="Login" className="btn btn-block" />
          </form>
        </div>
      </div>      
        <p>Not Have Any Account? <Link to='/register' className="text-primary">Register Here</Link></p>
      <div className="divider">OR</div>
      <SocialLogin signInWithXXX={signInWithGoogle} text='Login with Google' />
      </div>
    </div>
  );
};

export default Login;
