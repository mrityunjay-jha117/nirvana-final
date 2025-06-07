import { useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignupInput,
  SigninInput,
  signupSchema,
  signinSchema,
} from "@mrityunjay__jha117/reload_common";
import { useDropzone } from "react-dropzone";
import InputBox from "../components/primary_components/primary_components/unique_components/input";
import Button from "../components/primary_components/primary_components/unique_components/button";
import ErrorMessage from "../components/primary_components/primary_components/unique_components/wrong_banner";

export default function Credentials() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [signupData, setSignupData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    image: "",
    about: "",
  });

  const [loginData, setLoginData] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const handleSignupChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch(
      "https://backend.mrityunjay-jha2005.workers.dev/api/v1/image/upload",
      {
        method: "POST",
        body,
      }
    );
    const data = await res.json();
    if (res.ok && data.url) {
      return data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const onDropImage = useCallback(async (acceptedFiles: File[]) => {
    try {
      const url = await uploadImage(acceptedFiles[0]);
      setSignupData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Image upload failed");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropImage,
    maxFiles: 1,
  });

  const handleSignupSubmit = async () => {
    const validation = signupSchema.safeParse(signupData);
    if (!validation.success) {
      setMessage(
        "Signup validation error: " + JSON.stringify(validation.error.errors)
      );
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.jwt);
        setMessage("Signup successful!");
        navigate("/window");
      } else {
        setMessage("Signup error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Error during signup, please try again.");
    }
    setIsSubmitting(false);
  };

  const handleLoginSubmit = async () => {
    const validation = signinSchema.safeParse(loginData);
    if (!validation.success) {
      setMessage(
        "Signin validation error: " + JSON.stringify(validation.error.errors)
      );
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.jwt);
        setMessage("Login successful!");
        navigate("/window");
      } else {
        setMessage("Login error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Signin error:", error);
      setMessage("Error during login, please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage: `url(/images/carousel_images/12.jpg)`,
        }}
      ></div>
      {/* Dark overlay to soften the background */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Main Content Container */}
      <div className="relative flex h-screen w-full items-center justify-center">
        {/* Desktop Layout */}
        <div className="hidden md:flex relative flex-row lg:h-2/3 w-5/6 mx-auto rounded-xl overflow-hidden shadow-lg bg-white bg-opacity-90">
          {/* LOGIN Section */}
          <div className="w-1/2 text-xs xl:text-sm font-medium flex flex-col items-center justify-center p-8">
            <h2 className="font-bold  mb-3 text-2xl md:text-3xl  tracking-wide">
              LOGIN
            </h2>
            <hr className="border-red-600 border-2 mb-3 w-2/3 xl:w-3/5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-3/5  h-8 p-3 mb-3 text-xs xl:text-sm font-medium bg-gray-200 rounded-lg  tracking-wide"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-3/5  h-8 p-3 mb-3 text-xs xl:text-sm font-medium bg-gray-200 rounded-lg  tracking-wide"
            />
            {/* LOGIN Button */}
            <button
              onClick={handleLoginSubmit}
              type="submit"
              className="cursor-pointer h-8 lg:h-9 w-3/5 xl:h-10 relative overflow-hidden border-2 border-red-500 rounded-full bg-red-500 text-white tracking-wide group transition-all duration-500 hover:border-red-500"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                </span>
              ) : (
                <>
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative group-hover:text-red-500 transition-colors duration-500">
                    LOGIN
                  </span>
                </>
              )}
            </button>
            <p className="text-base md:text-xs :text-sm mt-3 tracking-wide">
              Don't have an account?{" "}
              <span
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </span>
            </p>
          </div>

          {/* SIGN UP Section */}
          <div className="w-1/2  text-xs xl:text-sm font-medium  h-full flex flex-col items-center justify-center py-4">
            <h2 className="font-bold  mb-3 text-2xl md:text-3xl  tracking-wide">
              SIGN UP
            </h2>
            <hr className="border-red-600 border-2 mb-3 w-2/3 xl:w-3/5" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signupData.name}
              onChange={handleSignupChange}
              className="w-3/5  h-8 p-3 mb-3 text-xs xl:text-sm font-medium bg-gray-200 rounded-lg  tracking-wide"
            />
            <div className="flex w-3/5 flex-row items-center gap-2 justify-between mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-1/2 text-xs xl:text-sm font-medium h-8 p-3 mb-3 bg-gray-200 rounded-lg  tracking-wide"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-1/2 text-xs xl:text-sm font-medium h-8 p-3 mb-3 bg-gray-200 rounded-lg  tracking-wide"
              />
            </div>

            {/* Profile Image Dropzone with fixed height */}
            <div className="flex w-3/5 flex-row h-30 items-center gap-2 justify-between mb-3">
              <textarea
                name="about"
                placeholder="About"
                value={signupData.about}
                onChange={handleSignupChange}
                className="w-1/2 text-xs font-medium h-full p-3 mb-3 bg-gray-200 rounded-lg  tracking-wide "
              />
              <div
                className="border-2 h-full w-1/2 border-dashed border-gray-400 p-4 rounded-xl text-center mb-3 w-1/2  flex items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {signupData.image ? (
                  <p className="text-xs xl:text-sm font-medium text-gray-400">
                    Done
                  </p>
                ) : (
                  <p className="text-[10px] lg: text-xs xl:text-sm">
                    please select a profile image
                  </p>
                )}
              </div>
            </div>

            {/* SIGN UP Button */}
            <button
              onClick={handleSignupSubmit}
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer h-8 lg:h-9 w-3/5 xl:h-10 relative overflow-hidden border-2 border-red-500 rounded-full bg-red-500 text-white tracking-wide group transition-all duration-500 hover:border-red-500"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                </span>
              ) : (
                <>
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative group-hover:text-red-500 transition-colors duration-500">
                    SIGN UP
                  </span>
                </>
              )}
            </button>
            <p className=" mt-3 tracking-wide">
              Already have an account?{" "}
              <span
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setIsSignUp(false)}
              >
                LOGIN
              </span>
            </p>
          </div>

          {/* Overlay Section */}
          <div
            className="absolute z-10 bottom-0 top-0 w-1/2 text-left flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white  transition-all duration-500 tracking-wide"
            style={{ left: isSignUp ? "0" : "50%" }}
          >
            <div className="w-4/5 mx-auto  text-left flex flex-col items-center justify-center">
              <h2 className="md:text-5xl lg:text-7xl font-extrabold ">
                {isSignUp ? "Hello, Friend!" : "Welcome Back!"}
              </h2>

              <p className="mb-5 text-sm font-medium leading-relaxed">
                {isSignUp ? (
                  <>
                    Enter your personal details and start your journey with us.
                    <br />
                    <span className="tracking-wide text-white">
                      Already have an account!
                    </span>
                  </>
                ) : (
                  <>
                    <span className=" w-4/5 text-left text-white font-semibold">
                      To stay connected with us <br /> please login with your
                      personal info.
                    </span>
                    <br />
                    <span className="tracking-wide text-white  mt-10 font-medium">
                      Not connected yet!
                    </span>
                  </>
                )}
              </p>

              {/* Toggle Button on the Overlay */}
              <button
                className="cursor-pointer 
              px-10  
             py-1 w-2/3
             relative overflow-hidden 
             rounded-full 
             bg-white 
             text-red-500 
             md:text-sm lg:text-lg
             tracking-wide 
             group 
             transition-all duration-500 
             font-semibold"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "LOGIN" : "SIGN UP"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full max-w-md p-4">
          {isSignUp ? (
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg bg-opacity-90 tracking-wide">
              <h2 className="font-bold text-2xl sm:text-3xl mb-3 tracking-widest">
                SIGN UP
              </h2>
              <hr className="border-red-600 border-2 mb-5 w-2/3" />
              <InputBox
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={handleSignupChange}
              />
              <InputBox
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <InputBox
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <InputBox
                type="text"
                name="about"
                placeholder="About you"
                value={signupData.about}
                onChange={handleSignupChange}
              />

              {/* Profile Image Dropzone for Mobile */}
              <div
                className="border-2 w-11/12 border-dashed border-green-400 p-4 rounded-xl text-center mb-4"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {signupData.image ? (
                  <img
                    src={signupData.image}
                    alt="Profile"
                    className="mt-2 w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                ) : (
                  <p className="text-sm">
                    Drag & drop profile image here or click to select
                  </p>
                )}
              </div>
              {/* Mobile SIGN UP Button */}
              <Button
                buttonText="SIGN UP"
                onClick={handleSignupSubmit}
                isSubmitting={isSubmitting}
              />

              <p className="text-sm sm:text-base mt-3 tracking-wide">
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={() => setIsSignUp(false)}
                >
                  LOGIN
                </span>
              </p>
            </div>
          ) : (
            <div className="w-5/6 h-full mx-auto flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl bg-opacity-90 tracking-wide">
              <h2 className="font-bold text-2xl sm:text-3xl tracking-widest">
                LOGIN
              </h2>
              <hr className="border-red-600 border-2 mt-2 mb-7 w-5/6" />
              <InputBox
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <InputBox
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              {/* Mobile LOGIN Button */}
              <Button
                buttonText="LOGIN"
                onClick={handleLoginSubmit}
                isSubmitting={isSubmitting}
              />

              <p className="ml-4 text-sm sm:text-base mt-3 tracking-wide">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Notification message */}
      {message && <ErrorMessage text="wrong inputs entered" />}
    </div>
  );
}
