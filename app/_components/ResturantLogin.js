import { useRouter } from "next/navigation";
import { useState } from "react";

const ResturantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    }else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/resturants", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();
    if(response.success){
      const { result } = response;
      delete result.password;
      localStorage.setItem("resturantUser", JSON.stringify(result));  
      router.push("/resturant/dashboard");
    }else {
      alert("Login Failesd! Please check your email and password");
    }
  }
  return (
    <>
      <h3>Login</h3>
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && <span className="input-error">Please enter valid email</span>}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && <span className="input-error">Please enter valid password</span>}  
        </div>
        <button className="button" onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default ResturantLogin;
