"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  // State ko initial empty ya undefined rakhein
  const [user, setUser] = useState(undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  // Sab data initialization yahan useEffect mein karein
  useEffect(() => {
    // Ab ye block sirf browser mein chalega
    const userStorage = localStorage.getItem("user");
    const cartStorage = localStorage.getItem("cart");

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }

    if (cartStorage) {
      const parsedCart = JSON.parse(cartStorage);
      setCartItem(parsedCart);
      setCartNumber(parsedCart.length);
    }
  }, []); // Ye sirf component mount hone par ek baar chalega

  // Handle Add to Cart
  useEffect(() => {
    if (props.cartData) {
      let localCartItem = [...cartItem];
      
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
        (item) => item._id !== props.removeCartData
      );
      setCartItem(localCartItem);
      setCartNumber(localCartItem.length);
      localStorage.setItem("cart", JSON.stringify(localCartItem));

      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined); // State update karein taaki UI foran change ho
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
        <li><Link href="/">Home</Link></li>
        {user ? (
          <>
            <li><Link href="/myprofile">{user?.name}</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link href="/user-auth">Login</Link></li>
            <li><Link href="/user-auth">Signup</Link></li>
          </>
        )}
        <li>
          <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
        </li>
        <li><Link href="/">Add Restaurant</Link></li>
        <li><Link href="/deliverypartner">Delivery Partners</Link></li>
      </ul>
    </div>
  );
};

export default CustomerHeader;