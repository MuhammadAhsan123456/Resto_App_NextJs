import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandle = async () => {
    console.log(email, password);
    let response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Yeh line bahut zaruri hai
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      // UserLogin.js ke andar change karein
      if (props.redirect && props.redirect.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("User Login failed. Please try again with correct credentials.");
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Enter your password"
          className="input-field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button onClick={loginHandle} className="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
