// import { useState, useCallback, ChangeEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   SignupInput,
//   SigninInput,
//   signupSchema,
//   signinSchema,
// } from "@mrityunjay__jha117/reload_common";
// import { useDropzone } from "react-dropzone";
// import InputBox from "../../components/primary_components/primary_components/unique_components/input";
// import Button from "../../components/primary_components/primary_components/unique_components/button";
// import ErrorMessage from "../../components/primary_components/primary_components/unique_components/wrong_banner";

// export default function MobileView() {
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const [signupData, setSignupData] = useState<SignupInput>({
//     name: "",
//     email: "",
//     password: "",
//     image: "",
//     about: "",
//   });

//   const [loginData, setLoginData] = useState<SigninInput>({
//     email: "",
//     password: "",
//   });

//   const handleSignupChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setSignupData({ ...signupData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const uploadImage = async (file: File) => {
//     const body = new FormData();
//     body.append("file", file);

//     const res = await fetch(
//       "https://backend.mrityunjay-jha2005.workers.dev/api/v1/image/upload",
//       {
//         method: "POST",
//         body,
//       }
//     );
//     const data = await res.json();
//     if (res.ok && data.url) {
//       return data.url;
//     } else {
//       throw new Error("Image upload failed");
//     }
//   };

//   const onDropImage = useCallback(async (acceptedFiles: File[]) => {
//     try {
//       const url = await uploadImage(acceptedFiles[0]);
//       setSignupData((prev) => ({ ...prev, image: url }));
//     } catch (err) {
//       alert("Image upload failed");
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: onDropImage,
//     maxFiles: 1,
//   });

//   const handleSignupSubmit = async () => {
//     const validation = signupSchema.safeParse(signupData);
//     if (!validation.success) {
//       setMessage(
//         "Signup validation error: " + JSON.stringify(validation.error.errors)
//       );
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const res = await fetch(
//         "https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/signup",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(validation.data),
//         }
//       );
//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("jwt", data.jwt);
//         setMessage("Signup successful!");
//         navigate("/window");
//       } else {
//         setMessage("Signup error: " + (data.error || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setMessage("Error during signup, please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleLoginSubmit = async () => {
//     const validation = signinSchema.safeParse(loginData);
//     if (!validation.success) {
//       setMessage(
//         "Signin validation error: " + JSON.stringify(validation.error.errors)
//       );
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const res = await fetch(
//         "https://backend.mrityunjay-jha2005.workers.dev/api/v1/user/signin",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(validation.data),
//         }
//       );
//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("jwt", data.jwt);
//         setMessage("Login successful!");
//         navigate("/window");
//       } else {
//         setMessage("Login error: " + (data.error || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Signin error:", error);
//       setMessage("Error during login, please try again.");
//     }
//     setIsSubmitting(false);
// return (
//   <div className="md:hidden w-full max-w-md p-4">
//           {isSignUp ? (
//             <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg bg-opacity-90 tracking-wide">
//               <h2 className="font-bold text-2xl sm:text-3xl mb-3 tracking-widest">
//                 SIGN UP
//               </h2>
//               <hr className="border-red-600 border-2 mb-5 w-2/3" />
//               <InputBox
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={signupData.name}
//                 onChange={handleSignupChange}
//               />
//               <InputBox
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={signupData.email}
//                 onChange={handleSignupChange}
//               />
//               <InputBox
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={signupData.password}
//                 onChange={handleSignupChange}
//               />
//               <InputBox
//                 type="text"
//                 name="about"
//                 placeholder="About you"
//                 value={signupData.about}
//                 onChange={handleSignupChange}
//               />

//               {/* Profile Image Dropzone for Mobile */}
//               <div
//                 className="border-2 w-11/12 border-dashed border-green-400 p-4 rounded-xl text-center mb-4"
//                 {...getRootProps()}
//               >
//                 <input {...getInputProps()} />
//                 {signupData.image ? (
//                   <img
//                     src={signupData.image}
//                     alt="Profile"
//                     className="mt-2 w-32 h-32 object-cover rounded-lg mx-auto"
//                   />
//                 ) : (
//                   <p className="text-sm">
//                     Drag & drop profile image here or click to select
//                   </p>
//                 )}
//               </div>
//               {/* Mobile SIGN UP Button */}
//               <Button
//                 buttonText="SIGN UP"
//                 onClick={handleSignupSubmit}
//                 isSubmitting={isSubmitting}
//               />

//               <p className="text-sm sm:text-base mt-3 tracking-wide">
//                 Already have an account?{" "}
//                 <span
//                   className="cursor-pointer text-blue-500"
//                   onClick={() => setIsSignUp(false)}
//                 >
//                   LOGIN
//                 </span>
//               </p>
//             </div>
//           ) : (
//             <div className="w-5/6 h-full mx-auto flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-xl bg-opacity-90 tracking-wide">
//               <h2 className="font-bold text-2xl sm:text-3xl tracking-widest">
//                 LOGIN
//               </h2>
//               <hr className="border-red-600 border-2 mt-2 mb-7 w-5/6" />
//               <InputBox
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={loginData.email}
//                 onChange={handleLoginChange}
//               />
//               <InputBox
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={handleLoginChange}
//               />
//               {/* Mobile LOGIN Button */}
//               <Button
//                 buttonText="LOGIN"
//                 onClick={handleLoginSubmit}
//                 isSubmitting={isSubmitting}
//               />

//               <p className="ml-4 text-sm sm:text-base mt-3 tracking-wide">
//                 Don't have an account?{" "}
//                 <span
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => setIsSignUp(true)}
//                 >
//                   Sign Up
//                 </span>
//               </p>
//             </div>
//           )}
//         </div>
// )
// }
