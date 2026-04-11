"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import ResturantFooter from "../_components/Footer";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const [userStorage, setUserStorage] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // LocalStorage access sirf useEffect ke andar (Client Side)
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser && storedCart) {
      const user = JSON.parse(storedUser);
      const cart = JSON.parse(storedCart);
      
      setUserStorage(user);
      setCartStorage(cart);

      // Total calculate karne ki sahi logic
      const calculatedTotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
      setTotal(calculatedTotal);
    } else {
      // Agar cart khali hai toh home pe bhej dein
      router.push("/");
    }
  }, [router]);

  const orderNow = async () => {
    if (!userStorage || cartStorage.length === 0) {
      alert("User or Cart data missing");
      return;
    }

    const user_id = userStorage._id;
    const city = userStorage.city;
    const foodItemIds = cartStorage.map((item) => item._id).toString();

    try {
      // 1. Delivery Boy Fetch karein (City wise)
      let deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
      let deliveryData = await deliveryBoyResponse.json();
      
      // Note: check karein aapki API "result" bhej rahi hai ya kuch aur
      let deliveryBoyIds = deliveryData.result ? deliveryData.result.map((item) => item._id) : [];

      if (deliveryBoyIds.length === 0) {
        alert("Is city mein koi delivery partner available nahi hai.");
        return;
      }

      // Randomly ek delivery boy select karein
      const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
      console.log("Selected Delivery Boy ID:", deliveryBoy_id);

      const resto_id = cartStorage[0].resto_id;
      const collection = {
        user_id,
        resto_id,
        foodItemIds,
        deliveryBoy_id,
        status: "confirm",
        amount: total + DELIVERY_CHARGE + (total * TAX) / 100,
      };

      // 2. Order POST Request
      let response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        body: JSON.stringify(collection),
      });

      let orderResult = await response.json();
      
      if (orderResult.success) {
        alert("Your order has been placed successfully");
        localStorage.removeItem("cart"); // Order ke baad cart saaf karein
        setRemoveCartData(true);
        router.push("/myprofile");
      } else {
        alert("Order place karne mein masla hua, dubara koshish karein.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("API connection mein masla hai.");
    }
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

export default OrderPage;