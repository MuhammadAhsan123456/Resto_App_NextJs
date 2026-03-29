// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const CustomerHeader = (props) => {
//   const cartStorage = JSON.parse(localStorage.getItem("cart"));
//   const [cartNumber, setCartNumber] = useState(cartStorage?.length);
//   const [cartItem, setCartItem] = useState(cartStorage);

//   useEffect(() => {
//     if (props.cartData) {
//       console.log(props);
//       if (cartNumber) {
//         if (cartItem[0].resto_id != props.cartData.resto_id) {
//           localStorage.removeItem("cart");
//           setCartNumber(1);
//           setCartItem([props.cartData]);
//           localStorage.setItem("cart", JSON.stringify([props.cartData]));
//         } else {
//           let localCartItem = cartItem;
//           localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
//           setCartItem(localCartItem);
//           setCartNumber(cartNumber + 1);
//           localStorage.setItem("cart", JSON.stringify(localCartItem));
//         }
//       } else {
//         setCartNumber(1);
//         setCartItem([props.cartData]);
//         localStorage.setItem("cart", JSON.stringify([props.cartData]));
//       }
//     }
//   }, [props.cartData]);

//   return (
//     <div className="header-wrapper">
//       <div className="logo">
//         <img
//           style={{ width: 70 }}
//           src="https://img.freepik.com/premium-vector/minimalist-food-delivery-logo-design-modern-simple-branding-delivery-services_838011-283.jpg"
//         />
//       </div>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         <li>
//           <Link href="/">Cart({cartNumber ? cartNumber : 0})</Link>
//         </li>
//         <li>
//           <Link href="/">Add Resturant</Link>
//         </li>
//         <li>
//           <Link href="/">Login</Link>
//         </li>
//         <li>
//           <Link href="/">Signup</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default CustomerHeader;



"use client"; // Top par lazmi likhein
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  // 1. Initial states ko default values pe rakhein
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  // 2. localStorage se data sirf browser par fetch karein
  useEffect(() => {
    const localData = localStorage.getItem("cart");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setCartItem(parsedData);
      setCartNumber(parsedData.length);
    }
  }, []);

  // 3. Cart update logic (Jo aapka pehle se tha)
  useEffect(() => {
    if (props.cartData) {
      if (cartNumber > 0) {
        if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = [...cartItem]; // Spread operator use karein (Behtar practice hai)
          localCartItem.push(props.cartData);
          setCartItem(localCartItem);
          setCartNumber(localCartItem.length);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

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
        <li><Link href="/">Cart({cartNumber})</Link></li>
        <li><Link href="/">Add Restaurant</Link></li>
        <li><Link href="/">Login</Link></li>
        <li><Link href="/">Signup</Link></li>
      </ul>
    </div>
  );
};

export default CustomerHeader;