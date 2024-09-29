import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { insertUser } from "../../api/api.tsx";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: "1",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
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
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "password") {
      PasswordCheck(e);
    } else {
      const newError = { ...error };
      switch (name) {
        case "firstName":
          if (value === "") {
            newError.firstNameError = "First Name is required";
          } else if (value.length < 2) {
            newError.firstNameError = "At least 2 characters";
          } else {
            newError.firstNameError = "";
          }
          break; // Add break statement

        case "lastName":
          if (value === "") {
            newError.lastNameError = "Last Name is required";
          } else if (value.length < 2) {
            newError.lastNameError = "At least 2 characters";
          } else {
            newError.lastNameError = "";
          }
          break; // Add break statement

        case "email":
          const [domainPart] = value.split("@");
          const specialCharCheck = /^[a-zA-Z0-9._%+-]+$/;

          if (value === "") {
            newError.emailError = "Please enter email";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newError.emailError = "Please enter a valid email address";
          } else if (!specialCharCheck.test(domainPart)) {
            newError.emailError = "Domain part contains invalid characters";
          } else {
            newError.emailError = "";
          }
          break; // Add break statement

        case "confirmPassword":
          if (value === "") {
            newError.confirmPasswordError = "Field is required";
          } else if (value !== userData.password) {
            newError.confirmPasswordError = "Passwords do not match";
          } else {
            newError.confirmPasswordError = "";
          }
          break; // Add break statement

        default:
          // Handle default case if needed
          break; // Add break statement
      }

      setError(newError);
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSignUp = async () => {
    const { firstName, lastName, email, password } = userData;
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
    if (dataCompleted === true) {
      const response = await insertUser({
        rolId: Number(userData.role),
        firstName,
        lastName,
        email,
        password,
      });
      if (response.status === 200) {
        if (response.data.status === false) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.result);
          setUserData({
            role: "1",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setTimeout(() => {
            navigate("/"); // Adjust the path as necessary
          }, 1000);
        }
      } else {
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-100 h-auto rounded-lg shadow-2 bg-white">
        <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-4 flex justify-between gap-2 sm:gap-8 custome-height">
          <label
            htmlFor="flexRadioDefault1"
            className={`flex items-center bg-[#f5f0e8] w-full pl-3 sm:pl-5 text-sm rounded-[15px] cursor-pointer w-full h-[40px]`}
          >
            <input
              className="mr-2"
              type="radio"
              name="role"
              id="flexRadioDefault1"
              value="1"
              checked={userData.role === "1"}
              onChange={handleInputChange}
            />
            <span className="tracking-wide text-client_color cursor-pointer">
              customer
            </span>
          </label>

          <label
            htmlFor="flexRadioDefault2"
            className={`flex items-center pl-3 sm:pl-5 bg-[#f5f0e8] w-full text-sm rounded-[15px] cursor-pointer custome-margin h-[40px]`}
          >
            <input
              className="mr-2"
              type="radio"
              name="role"
              id="flexRadioDefault2"
              value="2"
              checked={userData.role === "2"}
              onChange={handleInputChange}
            />
            <span className="tracking-wide text-client_color cursor-pointer">
              Admin
            </span>
          </label>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div className="flex flex-row gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    required
                    className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {error.firstNameError && (
                  <div className="flex items-center justify-between">
                    <p className="text-red-500 text-[12px]">
                      {error.firstNameError}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last Name
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    required
                    className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {error.lastNameError && (
                  <div className="flex items-center justify-between">
                    <p className="text-red-500 text-[12px]">
                      {error.lastNameError}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your email
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.confirmPasswordError && (
                <div className="flex items-center justify-between">
                  <p className="text-red-500 text-[12px]">
                    {error.confirmPasswordError}
                  </p>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={handleSignUp}
                className="flex w-full justify-center rounded-md bg-[green] px-3 py-1.5 text-sm font-semibold border-[1px] leading-6 text-white hover:text-[green] shadow-sm hover:bg-white hover:border-[green] hover:border-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </div>
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Login here!{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
