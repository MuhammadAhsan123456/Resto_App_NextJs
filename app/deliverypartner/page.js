"use client";
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  useEffect(()=>{
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if(delivery){
      router.push("/deliverydashboard");
    } 
  },[])

  const handleSignup = async () => {
    console.log(name, mobile, password, confirmPassword, city, address);
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Yeh line bahut zaruri hai
        },
        body: JSON.stringify({
          name,
          mobile,
          password,
          city,
          address,
        }),
      },
    );
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      alert("User Signup successful");
      router.push("/deliverydashboard");
    } else {
      alert("User Signup failed");
    }
  };

  const loginHandle = async () => {
    console.log(loginMobile, loginPassword);
    let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Yeh line bahut zaruri hai
      },
      body: JSON.stringify({
        mobile: loginMobile,
        password: loginPassword,
      }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      alert("User Login successful");
      router.push("/deliverydashboard");
    } else {
      alert("User Login failed. Please try again with correct credentials.");
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <h1>Delivery Partner</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h1>Login</h1>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="input-field"
              value={loginMobile}
              onChange={(event) => setLoginMobile(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button onClick={loginHandle} className="button">Login</button>
          </div>
        </div>

        <div className="signup-wrapper">
          <h1>Signup</h1>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your name"
              className="input-field"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your Contact Number"
              className="input-field"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your confirm password"
              className="input-field"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your city"
              className="input-field"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your address"
              className="input-field"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your Contact Number"
              className="input-field"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button onClick={handleSignup} className="button">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
