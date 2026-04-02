"use client";
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/UserSignup";
import ResturantFooter from "../_components/Footer";
const UserAuth = () => {
  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>User Authentication Page</h1>
        <UserSignup />
      </div>
      <ResturantFooter />
    </div>
  );
};

export default UserAuth;
