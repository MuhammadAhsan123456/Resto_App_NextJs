"use client";
import ResturantHeader from "@/app/_components/ResturantHeader";
import "./../style.css";
import AddFoodItem from "../../_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "../../_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <div>
      <ResturantHeader />
      <button onClick={()=>setAddItem(true)}>Add Food</button>
      <button onClick={()=>setAddItem(false)}>Dashboard</button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
};

export default Dashboard;
