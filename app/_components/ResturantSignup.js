 import { useRouter } from "next/navigation";
import { useState } from "react";

const ResturantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_Password, setc_Password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = async () => {
    if(password !== c_Password){
      setPasswordError(true);
      return false;
    }else {
      setPasswordError(false);
    }
    if(!email || !password || !c_Password || !name || !city || !Address || !contact){
      setError(true);
      return false;
    }else{
      setError(false);
    }
    console.log(email, password, c_Password, name, city, Address, contact);
    let response = await fetch("http://localhost:3000/api/resturants", {
      method: "POST",
      body: JSON.stringify({ email, password, name, city, Address, contact }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      console.log(response);
      const { result } = response;
      delete result.password;
      localStorage.setItem("resturantUser", JSON.stringify(result));
      router.push("/resturant/dashboard");
    }
    // if(result.success){
    //   alert("Resturants Register successful");
    // }
  };

  return (
    <>
      <h3>Signup</h3>
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter your email address"
            className="input-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
           {
            error && !email && <span className="input-error">Please enter valid email address</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {
            passwordError && <span className="input-error">Password and Confirm password not match</span>
          }
          {
            error && !password && <span className="input-error">Please enter valid password</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={c_Password}
            onChange={(event) => setc_Password(event.target.value)}
          />
          {
            passwordError && <span className="input-error">Password and Confirm password not match</span>
          }
          {
            error && !c_Password && <span className="input-error">Please enter valid confirm password</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            className="input-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {
            error && !name && <span className="input-error">Please enter valid returant name</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City"
            className="input-field"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          {
            error && !city && <span className="input-error">Please enter valid city</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Full Address"
            className="input-field"
            value={Address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {
            error && !Address && <span className="input-error">Please enter valid address</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Contact No."
            className="input-field"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          {
            error && !contact && <span className="input-error">Please enter valid contact</span>
          }
        </div>
        <button className="button" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </>
  );
};

export default ResturantSignup;
