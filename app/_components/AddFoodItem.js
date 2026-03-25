import { useState } from "react";

const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFoodItem = async () => {
    console.log(name, price, path, description);
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let resto_id;
    const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
    if (resturantData) {
      resto_id = resturantData._id;
    }
    let response = await fetch("http://localhost:3000/api/resturants/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        img_path: path,
        description,
        resto_id, // Ensure this ID is correct!
      }),
      // 👇 YE HEADERS DALNA LAZMI HAI 👇
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    if (response.success) {
      alert("Food Item Added Successfully");
      props.setAddItem(false); 
    } else {
      alert("Failed to Add Food Item");
    }
  };

  return (
    <div className="container">
      <h1>Add New Food Item</h1>
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
        <button className="button" onClick={handleAddFoodItem}>
          Add Food Items
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
