"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

const page = () => {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocation();
    loadRestaurants();
  }, []);

  const loadLocation = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.resturant) {
      url = url + "?resturant=" + params.resturant;
    }

    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  console.log(restaurants);

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        {/* <div className="input-wrapper">
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
            onChange={(event) =>
              loadRestaurants({ resturant: event.target.value })
            }
          />
        </div> */}

        <div className="input-wrapper">
          <input
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            type="text"
            className="select-input"
            placeholder="Select Place"
            readOnly // 👈 Ye add karne se "onChange" wala error khatam ho jayega
          />

          <ul className="location-list">
            {showLocation &&
              locations.map(
                (
                  item,
                  index, // 👈 Index ya item use karein key ke liye
                ) => (
                  <li key={index} onClick={() => handleListItem(item)}>
                    {item}
                  </li>
                ),
              )}
          </ul>

          <input
            type="text"
            className="search-input"
            placeholder="Enter Food and Restaurant Name"
            onChange={(event) =>
              loadRestaurants({ resturant: event.target.value })
            }
          />
        </div>
      </div>
      <div className="resturant-list-container">
        {restaurants.map((item) => (
          // Yahan key add karni hai 👇
          <div
            key={item._id}
            onClick={() =>
              router.push("explore/" + item.name + "?id=" + item._id)
            }
            className="resturant-wrapper"
          >
            <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city}</div>
              <div>
                {item.address} Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="resturant-list-container">
        {
        restaurants.map((item) => (
          <div onClick={()=>router.push('explore/'+item.name+"?id="+item._id)} className="resturant-wrapper">
            <div className="heading-wrapper"> 
              <h3>{item.name}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper"> 
              <div>{item.city}</div>
              <div>{item.address} Email: {item.email}</div>
            </div>
          </div>
        ))
        }
      </div> */}

      <Footer />
    </main>
  );
};

export default page;
