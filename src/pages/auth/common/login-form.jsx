import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "@/store/slices/auth";
import { toast } from "react-toastify";
import customAxios from "../../../apis/CustomAxios";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    makeApiCall(data)
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password
    // );
    // if (true) {
  
    // } else {
    //   toast.error("Invalid credentials", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  
  const makeApiCall = async (data) => {
    const requestData = {
      username: data.email,
      password: data.password
    };
    try {
      const response = await customAxios.post('admin/login', requestData);
      console.log('API Response:', response.data.token);
      if(response.data.token){
        dispatch(handleLogin({jwt:response.data.token}));
        setTimeout(() => {
          navigate("/dealer");
        }, 1500);
      }
     
   
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        placeholder='example@gmail.com'
        // defaultValue={''}
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder='password'
        // defaultValue={''}
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
