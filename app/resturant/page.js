"use client";
import { useState } from "react";
import ResturantLogin from "../_components/ResturantLogin";
import ResturantSignup from "../_components/ResturantSignup";
import ResturantHeader from "../_components/ResturantHeader";
import './style.css'
import Footer from "../_components/Footer";

const Resturant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <ResturantHeader  />
        <h1>Resturant Login/Signup Page</h1>
        {login ? <ResturantLogin /> : <ResturantSignup />}
        <div>
          <button className="button-login" onClick={() => setLogin(!login)}>
            {login
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resturant;
