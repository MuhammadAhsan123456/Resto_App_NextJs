"use client";
import Link from "next/link"; 

const DeliveryHeader = (props) => {
  
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 70 }}
          src="https://img.freepik.com/premium-vector/minimalist-food-delivery-logo-design-modern-simple-branding-delivery-services_838011-283.jpg"
          alt="logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryHeader;
