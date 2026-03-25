"use client";
import { useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";

const EditFoodItem = (props) => {
  // 2. Params ko unwrap karein
  const params = use(props.params);
  const id = params.id;

  console.log("Food ID is:", id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const route = useRouter();

  useEffect(()=> {
    handleLoadFoodItem();
  },[])
  const handleLoadFoodItem = async () => {
    let response = await fetch("http://localhost:3000/api/resturants/foods/edit/" + id);
    response = await response.json();
    if(response.success){
        console.log(response.result);
        setName(response.result.name);
        setPrice(response.result.price);
        setPath(response.result.img_path);
        setDescription(response.result.description);
    }
  }

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    console.log(name, price, path, description);

    let response = await fetch("http://localhost:3000/api/resturants/foods/edit/" + id, {
        method: "PUT",
        body: JSON.stringify({
            name, price, img_path: path, description
        })
    });
    response = await response.json();
    if(response.success){
        alert("Food Item Updated Successfully");
        route.push('../dashboard/');
    }else{
        alert("Failed to Update Food Item");
    }
  };

  return (
    <div className="container">
      <h1>Update New Food Item</h1>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please Enter Valid Name.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Please Enter Valid Price.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Image Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Please Enter Valid Image Path.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Please Enter Valid Description.</span>
        )}
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleEditFoodItem}>
          Update Food Item
        </button>
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => route.push('../dashboard/')}>
         Back to Food Item List
        </button>
      </div>
    </div>
  );
};

export default EditFoodItem;
