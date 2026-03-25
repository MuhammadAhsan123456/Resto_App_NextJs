"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ResturantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("resturantUser");
    if (!data && pathname == "/resturant/dashboard") {
      router.push("/resturant");
    } else if (data && pathname == "/resturant") {
      router.push("/resturant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("resturantUser");
    router.push("/resturant");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://img.freepik.com/premium-vector/minimalist-food-delivery-logo-design-modern-simple-branding-delivery-services_838011-283.jpg"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {details && details.name ? (
          <>
            <li>
              {" "}
              <Link href="/">Profile </Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            {" "}
            <Link href="/">Login/Signup</Link>{" "}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ResturantHeader;
