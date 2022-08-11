import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const UploadPhoto = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const url ="https://api.imgbb.com/1/upload?key=1b6521bd0bd67a12328f7f6c0e209344";
  const onSubmit = async (data) => {
    const formData = new FormData();
    const photo = data.photo[0];
    await formData.append("image", photo);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const imgUrl = result.data.url;
          const userImage = {
            img: imgUrl,
          };
          const uri = `https://powerful-oasis-61993.herokuapp.com/mf/updateUser/${user?.email}`;
          fetch(`http://localhost:4000/mf/updateUser/${user?.email}`,{
                method: 'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userImage)
            })
            .then(res=>res.json())
            .then(userData=>{
              console.log(userData)
                if(userData.modifiedCount>0){
                    navigate('/dashboard',{replace: true})
                    toast.success(`photo update successfully`);
                    reset()
                  } else {
                    toast.error('Failed to change photo')
                  }
            })
        
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Your Photo</span>
          </label>
          <input
            type="file"
            {...register("photo")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <input type="submit" className="btn btn-accent" value="Upload" />
      </form>
    </div>
  );
};

export default UploadPhoto;
