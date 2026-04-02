// "use client";
// import { useEffect, useState, use } from "react"; // 'use' ko import karein
// import CustomerHeader from "../../_components/CustomerHeader";
// import Footer from "../../_components/Footer";

// const Page = (props) => {
//   // Client component mein params unwrap karne ka tareeka
//   const params = use(props.params);
//   const searchParams = use(props.searchParams);

//   const name = params.name;
//   const id = searchParams.id;

//   const [returantsDetails, setResturantDetails] = useState();
//   const [foodItems, setFoodItems] = useState([]);
//   const [cartData, setCartData] = useState();
//   const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
//   const [cartIds, setcartIds] = useState(cartStorage?()=>cartStorage.map((item)=>{
//     return item._id;
//   }):[]);
//   const [removeCartData, setRemoveCartData] = useState();


//   useEffect(() => {
//     if (id) {
//       loadResturantDetails();
//     }
//   }, [id]);

//   const loadResturantDetails = async () => {
//     let response = await fetch("http://localhost:3000/api/customer/" + id);
//     response = await response.json();
//     if (response.success) {
//       setResturantDetails(response.details);
//       setFoodItems(response.foodItems);
//     }
//   };

//   const addToCart = (item) => {
//     let localCartIds = cartIds;
//     localCartIds.push(item._id);
//     setcartIds(localCartIds);
//     setCartData(item);
//     setRemoveCartData(id)
//   }

//   const removeFromCart = (id)=>{
//     setRemoveCartData(id);
//     var localIds = cartIds.filter(item=>item!==id);
//     setCartData();
//     setcartIds(localIds);
//   } 

//   return (
//     <div>
//       <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
//       <div className="resturant-page-banner">
//         <h1>{decodeURIComponent(name)}</h1>
//       </div>
//      <div className="detail-wrapper">
//       <h3><span>Contact:</span> {returantsDetails?.contact}</h3>
//       <h3><span>City:</span> {returantsDetails?.city}</h3>
//       <h3><span>Address:</span> {returantsDetails?.address}</h3>
//       <h3><span>Email:</span> {returantsDetails?.email}</h3>
//     </div>
//       <div className="food-item-wrapper">
//         {
//         foodItems.length>0? foodItems.map((item) => (
//           <div className="list-item">
//             <div>
//               {" "}
//               <img style={{ width: 100 }} src={item.img_path} />
//             </div>
//             <div>
//               <div>{item.name}</div>
//               <div>{item.price}</div>
//               <div className="description">{item.description}</div>
//               {
//                 cartIds.includes(item._id) ? <button onClick={()=>removeFromCart(item._id)}>Remove from Cart</button> : <button onClick={()=>addToCart(item)}>Add to Cart</button>
//               }
//             </div>
//           </div>
//         ))
//         : <h1>No Food Item Added For Now</h1>
//         }
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Page;


"use client";
import { useEffect, useState, use } from "react";
import CustomerHeader from "../../_components/CustomerHeader";
import ResturantFooter from "../../_components/Footer";

const Page = (props) => {
  const params = use(props.params);
  const searchParams = use(props.searchParams);

  const name = params.name;
  const id = searchParams.id;

  const [returantsDetails, setResturantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartIds, setcartIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    if (id) {
      loadResturantDetails();
    }
    // Initial cart load from localStorage
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const parsed = JSON.parse(localCart);
      setcartIds(parsed.map(item => item._id));
    }
  }, [id]);

  const loadResturantDetails = async () => {
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setResturantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    setCartData(item); // Sirf cartData set karein
    setcartIds([...cartIds, item._id]); // Nayi ID array mein add karein
    setRemoveCartData(null); // Clear remove state taake conflict na ho
  }

  const removeFromCart = (id) => {
    setRemoveCartData(id); // Sirf remove ID set karein
    setcartIds(cartIds.filter(itemId => itemId !== id)); // ID array se remove karein
    setCartData(null); // Clear add state
  }

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="resturant-page-banner">
        <h1>{decodeURIComponent(name)}</h1>
      </div>
      <div className="detail-wrapper">
        <h3><span>Contact:</span> {returantsDetails?.contact}</h3>
        <h3><span>City:</span> {returantsDetails?.city}</h3>
        <h3><span>Address:</span> {returantsDetails?.address}</h3>
        <h3><span>Email:</span> {returantsDetails?.email}</h3>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? foodItems.map((item) => (
          <div className="list-item" key={item._id}>
            <div>
              <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
            </div>
            <div>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div className="description">{item.description}</div>
              {
                cartIds.includes(item._id) ? 
                <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button> : 
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              }
            </div>
          </div>
        )) : <h1>No Food Item Added For Now</h1>}
      </div>
      <ResturantFooter />
    </div>
  );
};

export default Page;