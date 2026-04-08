"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();
  console.log(userStorage);

  // Load initial cart
  useEffect(() => {
    const localData = localStorage.getItem("cart");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setCartItem(parsedData);
      setCartNumber(parsedData.length);
    }
  }, []);

  // Handle Add to Cart
  useEffect(() => {
    if (props.cartData) {
      let localCartItem = [...cartItem];
      // Check if different restaurant
      if (
        localCartItem.length > 0 &&
        localCartItem[0].resto_id !== props.cartData.resto_id
      ) {
        localCartItem = [props.cartData];
        localStorage.removeItem("cart");
      } else {
        localCartItem.push(props.cartData);
      }

      setCartItem(localCartItem);
      setCartNumber(localCartItem.length);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
    }
  }, [props.cartData]);

  // Handle Remove from Cart
  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem.filter(
        (item) => item._id !== props.removeCartData,
      );
      setCartItem(localCartItem);
      setCartNumber(localCartItem.length); // Direct length use karein (cartNumber - 1 ki jagah)
      localStorage.setItem("cart", JSON.stringify(localCartItem));

      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);

  useEffect(() => {
    if (props.removeCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [props.removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

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
        {user ? (
          <>
            <li>
              <Link href="/myprofile">{user?.name}</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Login</Link>
            </li>
            <li>
              <Link href="/">Signup</Link>
            </li>
          </>
        )}
        <li>
          <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
        </li>
        <li>
          <Link href="/">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
