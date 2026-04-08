"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import ResturantFooter from "../_components/Footer";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const page = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user")),
  );
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart")),
  );
  const [total] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0].price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        }),
  );
  console.log(total);

  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total]);

  const orderNow = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let deliveryBoy_id = "64a1c8e5b9d2c0e7f0e7b8ab";

    let resto_id = cart[0].resto_id;
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGE + (total * TAX) / 100,
    };

    let response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("Your order has been placed successfully");
      setRemoveCartData(true);
      router.push("/myprofile");
    } else {
      alert("Something went wrong, please try again later");
    }

    console.log(collection);
  };

  return (
    <div>
      <CustomerHeader removeCartData={removeCartData} />
      <div className="total-wrapper">
        <div className="block-1">
          <h2>Users Details</h2>
          <div className="row">
            <span>Name</span>
            <span>{userStorage?.name}</span>
          </div>
          <div className="row">
            <span>Address</span>
            <span>{userStorage?.address}</span>
          </div>
          <div className="row">
            <span>Mobile</span>
            <span>{userStorage?.mobile}</span>
          </div>
          <h2>Amounts Details</h2>
          <div className="row">
            <span>Tax: </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charges : </span>
            <span>{DELIVERY_CHARGE}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>{total + (total * TAX) / 100 + DELIVERY_CHARGE}</span>
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash on Delivery: </span>
            <span>{total + (total * TAX) / 100 + DELIVERY_CHARGE}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <ResturantFooter />
    </div>
  );
};

export default page;
