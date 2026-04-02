import React, { useState } from 'react'

const UserSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const handleSignup = () => {
        console.log(name, email, password, confirmPassword, city, address, mobile);
    }

  return (
    <div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your name' 
                className='input-field' 
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your email' 
                className='input-field' 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your password' 
                className='input-field' 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your confirm password' 
                className='input-field' 
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your city' 
                className='input-field' 
                value={city}
                onChange={(event) => setCity(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your address' 
                className='input-field' 
                value={address}
                onChange={(event) => setAddress(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <input 
                type="text" 
                placeholder='Enter your Contact Number' 
                className='input-field' 
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
            />
        </div>
        <div className='input-wrapper'>
            <button onClick={handleSignup} className='button'>Signup</button>
        </div>
    </div>
  )
}

export default UserSignup