"use client";
import { useEffect, useState, use } from "react"; // 'use' ko import karein
import CustomerHeader from "../../_components/CustomerHeader";
import Footer from "../../_components/Footer";

const Page = (props) => {
  // Client component mein params unwrap karne ka tareeka
  const params = use(props.params);
  const searchParams = use(props.searchParams);

  const name = params.name;
  const id = searchParams.id;

  const [returantsDetails, setResturantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();


  useEffect(() => {
    if (id) {
      loadResturantDetails();
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
    setCartData(item);
  }

  return (
    <div>
      <CustomerHeader cartData={cartData} />
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
        {
        foodItems.length>0? foodItems.map((item) => (
          <div className="list-item">
            <div>
              {" "}
              <img style={{ width: 100 }} src={item.img_path} />
            </div>
            <div>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div className="description">{item.description}</div>
              <button onClick={()=>addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))
        : <h1>No Food Item Added For Now</h1>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Page;
