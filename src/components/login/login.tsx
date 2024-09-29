import React, { useState } from "react";
import "../../css/style.css";
import LoginLogo from "../../assets/loginImage/loginImage.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../api/api.tsx";
import { Link } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let newErrors = { ...error };
    if (name === "password") {
      PasswordCheck(e);
    } else {
      if (name === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.emailError = "Please enter a valid email address";
        }
        const [domainPart] = value.split("@");
        const specialCharCheck = /^[a-zA-Z0-9._%+-]+$/;
        if (value === "") {
          newErrors.emailError = "Please enter email";
        } else if (!specialCharCheck.test(domainPart)) {
          newErrors.emailError = "Domain part contains invalid characters";
        } else {
          newErrors.emailError = "";
        }
      }
      setError(newErrors);
      setUserData({ ...userData, [name]: value });
    }
  };

  const PasswordCheck = (e) => {
    let newErrors = { ...error };
    let value = e.target.value;
    if (value.length < 8)
      newErrors.passwordError = "Password must be at least 8 characters";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      newErrors.passwordError = "Password must contain a special character";
    else if (!/[0-9]/.test(value))
      newErrors.passwordError = "Password must contain a number";
    else if (!/[A-Z]/.test(value))
      newErrors.passwordError = "Password must contain a capital letter";
    else newErrors.passwordError = "";
    setError(newErrors);
    setUserData({ ...userData, password: e.target.value });
  };
  const handleSignIn = async () => {
    let dataCompleted = true;

    Object.entries(userData).map(([field, value]) => {
      if (value === "") {
        setError((prev) => ({
          ...prev,
          [`${field}Error`]: "Field is required",
        }));
        dataCompleted = false;
      }
    });
    Object.entries(error).map(([field, value]) => {
      if (value !== "") {
        dataCompleted = false;
      }
    });
    if (dataCompleted) {
      const response = await loginUser(userData);
      if (response.status === 200) {
        if (response.data.status === false) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.result);
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-100 h-auto rounded-lg shadow-2 bg-white">
        <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={LoginLogo}
            className="mx-auto h-30 w-auto"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.emailError && (
                <div className="flex items-center justify-between">
                  <p className="text-red-500 text-[12px]">{error.emailError}</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.passwordError && (
                <div className="flex items-center justify-between">
                  <p className="text-red-500 text-[12px]">
                    {error.passwordError}
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-[green] px-3 py-1.5 text-sm font-semibold border-[1px] leading-6 text-white hover:text-[green] shadow-sm hover:bg-white hover:border-[green] hover:border-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>
          <p className="mt-2 text-center">
            Not registered yet?
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
