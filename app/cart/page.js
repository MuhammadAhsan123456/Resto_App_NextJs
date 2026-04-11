"use client";
import { useState, useEffect } from 'react';
import CustomerHeader from '../_components/CustomerHeader'
import ResturantFooter from '../_components/Footer'
import { DELIVERY_CHARGE, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    // 1. Load Data from LocalStorage safely
    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("cart")) || [];
        setCartStorage(storage);
        calculateTotal(storage);
    }, []);

    // 2. Separate function to calculate total
    const calculateTotal = (data) => {
        if (data.length > 0) {
            const amount = data.reduce((acc, item) => acc + Number(item.price), 0);
            setTotal(amount);
        } else {
            setTotal(0);
        }
    }

    // 3. Remove from cart function (Takay error na aaye)
    const removeFromCart = (id) => {
        const updatedCart = cartStorage.filter((item) => item._id !== id);
        setCartStorage(updatedCart);
        calculateTotal(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        // Dispatch event takay header bhi update ho jaye agar aapne custom event lagaya hai
        window.dispatchEvent(new Event("storage"));
    }

    const orderNow = () => {
        if (typeof window !== 'undefined' && localStorage.getItem("user")) {
            router.push('/order');
        } else {
            router.push('/user-auth?order=true');
        }
    }

    return (
        <div>
            <CustomerHeader />
            <div className="food-item-wrapper">
                {cartStorage.length > 0 ? cartStorage.map((item) => (
                    <div className="list-item" key={item._id}>
                        <div className='list-item-block-1'>
                            <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                        </div>
                        <div className='list-item-block-2'>
                            <div>{item.name}</div>
                            <div className="description">{item.description}</div>
                            <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                        </div>
                        <div className='list-item-block-3'>Price: {item.price}</div>
                    </div>
                )) : (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h1>No Food Item Added For Now</h1>
                    </div>
                )}
            </div>

            {cartStorage.length > 0 && (
                <div className='total-wrapper'>
                    <div className='block-1'>
                        <div className='row'>
                            <span>Food Charges: </span>
                            <span>{total}</span>
                        </div>
                        <div className='row'>
                            <span>Tax: </span>
                            <span>{(total * TAX / 100).toFixed(2)}</span>
                        </div>
                        <div className='row'>
                            <span>Delivery Charges : </span>
                            <span>{DELIVERY_CHARGE}</span>
                        </div>
                        <hr />
                        <div className='row'>
                            <strong>Total Amount: </strong>
                            <strong>{(total + (total * TAX / 100) + DELIVERY_CHARGE).toFixed(2)}</strong>
                        </div>
                    </div>
                    <div className='block-2'>
                        <button onClick={orderNow}>Order Now</button>
                    </div>
                </div>
            )}
            <ResturantFooter />
        </div>
    )
}

export default Page;