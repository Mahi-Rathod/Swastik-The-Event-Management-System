import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import girlimg from '../../assets/logingirl.jpg'
import axios from "axios"
import './login.css'
function UserSignUp() {
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    isVendor: false
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  }

  const handleCheckboxChange = (event) => {
    setRegisterData({ ...registerData, isVendor: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password != confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return
    }
    try {
      console.log(registerData)
      let fullName = registerData.fullName.toUpperCase();
      let tuple = [' ', 'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

      for (let i = 0; i < fullName.length; i++) {
        if (!tuple.includes(fullName[i])) {
          alert("Name should only be alphabets");
          throw error;
        }
      }

      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/;
      if (!registerData.password.match(passw)) {
        alert("password should contain alphabets, numerics");
        throw error;
      }

      let mobileNumber = registerData.mobileNumber
      if (mobileNumber.length != 10) {
        alert("Please Enter valid Mobile Number");
        throw error;
      }
      for (let i = 0; i < mobileNumber.length; i++) {
        if (!number.includes(mobileNumber[i])) {
          alert("Please Enter Correct Mobile Number");
          throw error;
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, registerData);
      // Assuming API returns a success message or user data upon successful registration
      // Reset form data after successful registration
      if (response.data.statusCode === 200) {
        alert("Account Created Successfully");
        navigate('/login');
      }
      setPasswordMatchError('');
    } catch (error) {
      console.log("Error in Registering User: ", error);
      alert('Error registering user:');
    }
  }

  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <div className='w-[90%] h-[90vh] m-auto flex justify-center items-center'>
      <div className='w-[80%] h-[80vh] flex gap-2'>
        <div className='w-2/4 h-full rounded bg-white flex justify-center items-center'>
          <img src={girlimg} alt="" />
        </div>
        <div className='w-2/4 h-full bg-white rounded flex flex-col justify-evenly items-center'>

          <div className="font-mono text-3xl font-extrabold">
            <h3>Register Here</h3>
          </div>

          <div className='p-5 rounded drop-shadow-md'>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

              <div className="input-box">
                <input
                  type="text" name="fullName"
                  value={registerData.fullName}
                  onChange={handleChange}
                  required />
                <span>Full Name</span>
              </div>

              <div className="input-box">
                <input type="email" name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                />
                <span>Email</span>
              </div>

              <div className="input-box">
                <input type="text" name="mobileNumber"
                  value={registerData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <span>Mobile Number</span>
              </div>

              <div className="input-box">
                <input type="password" name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                />
                <span>Set Password</span>
              </div>

              <div className="input-box">
                <input type="password" name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirm}
                  required
                />
                <span>Confirm Password</span>
              </div>

              <div className="w-[100%] flex flex-row gap-4">
                <span>Are you vendor</span>
                <input
                  type="checkbox"
                  checked={registerData.isVendor}
                  onChange={handleCheckboxChange}
                />

              </div>


              <div className='submit-btn'>
                <button>Register</button>
              </div>

            </form >
          </div>

          <div className='text-[0.9rem] flex flex-row gap-2'>
            <p className='font-mono text-black text-[0.8rem]'>Have Account - <NavLink to="/login" className="text-[0.7rem] text-blue-600 drop-shadow-lg">Login here</NavLink></p>
            {/* <p className='font-mono text-black text-[0.8rem]'>Are you an vendor? <NavLink to="/vendor-sign-in" className="text-[0.7rem] text-blue-600 drop-shadow-lg">login here</NavLink></p> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserSignUp



// https://chat.openai.com/c/661c07b9-86c8-4763-9dbe-06a83954c42e