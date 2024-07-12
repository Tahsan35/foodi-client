import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  // redirecting to home page or specifig page
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Login successfull");
            navigate(from, { replace: true });
          });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password!");
      });
    reset();
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <dialog id='my_modal_5' className='modal modal-middle sm:modal-middle'>
      <div className='modal-box'>
        <div className='modal-action flex-col justify-center mt-0'>
          <form
            className='card-body'
            method='dialog'
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className='font-bold text-xl'>Please Login!</h3>

            {/* email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                className='input input-bordered'
                {...register("email")}
              />
            </div>
            {/* password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='password'
                className='input input-bordered'
                {...register("password", { required: true })}
              />
              <label className='label mt-1'>
                <a href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className='text-red text-xs italic'>
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className='form-control mt-4'>
              <input
                type='submit'
                className='btn bg-green text-white'
                value='Login'
              />
            </div>

            {/* close btn */}
            <div
              htmlFor='my_modal_5'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className='text-center my-2'>
              Donot have an account?
              <Link to='/signup' className='underline text-blue-500 ml-2'>
                Signup Now
              </Link>
            </p>
          </form>

          {/* social sign in */}
          <div className='text-center space-x-3 mb-5'>
            <button
              className='btn btn-circle hover:bg-green hover:text-white'
              onClick={handleRegister}
            >
              <FaGoogle />
            </button>
            <button className='btn btn-circle hover:bg-green hover:text-white'>
              <FaFacebookF />
            </button>
            <button className='btn btn-circle hover:bg-green hover:text-white'>
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
