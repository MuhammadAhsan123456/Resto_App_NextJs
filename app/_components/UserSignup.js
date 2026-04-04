import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserSignup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    console.log(name, email, password, confirmPassword, city, address, mobile);
    let response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Yeh line bahut zaruri hai
      },
      body: JSON.stringify({
        name,
        email,
        password,
        city,
        address,
        mobile,
      }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      // UserLogin.js ke andar change karein
      if (props.redirect && props.redirect.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("User Signup failed");
    }
  };

  return (
    <div>
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
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
  );
};

export default UserSignup;
