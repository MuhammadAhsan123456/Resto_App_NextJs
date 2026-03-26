"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

const page = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  console.log(locations);

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            type="text"
            className="select-input"
            placeholder="Select Place"
          />
          <ul className="location-list">
            {showLocation &&
              locations.map((item) => (
                <li onClick={() => handleListItem(item)}>{item}</li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            placeholder="Enter Food and Restaurant Name"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default page;
