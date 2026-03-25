import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState();
    const route = useRouter();

    useEffect(()=>{
        loadFoodItems();
    },[])

    const loadFoodItems = async () => {
        const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
        const resto_id = resturantData._id;
        let response = await fetch("http://localhost:3000/api/resturants/foods/" + resto_id);
        response = await response.json();
        if(response.success){
            setFoodItems(response.result);
        }
    }

    const deleteFoodItem = async (id) => {
        let response = await fetch("http://localhost:3000/api/resturants/foods/" + id, {
            method: "DELETE",
        });
        response = await response.json();
        if(response.success){
            loadFoodItems(); // Reload the food items after deletion
        }else{
            alert("Failed to Delete Food Item");
        }
  
    }
  return  <div>
    <h1>Food Item List</h1>
    <table>
        <thead>
            <tr>
                <td>S.No</td>
                <td>Name</td>
                <td>Price</td>
                <td>Description</td>
                <td>Image</td>
                <td>Operations</td>
            </tr>
        </thead>
        <tbody>
            {
              foodItems &&  foodItems.map((item, key)=>(
            <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td><img src={item.img_path}/></td>
                <td> <button onClick={()=>deleteFoodItem(item._id)}>Delete</button>
                <button onClick={() => route.push('dashboard/'+item._id)}>Edit</button></td>
            </tr>
                ))
            }
             
        </tbody>
    </table>
    </div>
}

export default FoodItemList