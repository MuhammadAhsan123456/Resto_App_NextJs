"use client";
import { use, useState } from "react"; // 'use' import karein
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/UserSignup";
import ResturantFooter from "../_components/Footer";
import UserLogin from "../_components/UserLogin";

const UserAuth = (props) => {
  // searchParams ko unwrap karein
  const searchParams = use(props.searchParams);
  const [login, setLogin] = useState(true);

  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User Signup"}</h1>
        {
          // Ab unwrapped searchParams pass karein
          login ? 
            <UserLogin redirect={searchParams} /> : 
            <UserLogin redirect={searchParams} />
        }
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login ? "Don't have an account? Signup" : "Already have an account? Login"}
        </button>
      </div>
      <ResturantFooter />
    </div>
  );
};

export default UserAuth;