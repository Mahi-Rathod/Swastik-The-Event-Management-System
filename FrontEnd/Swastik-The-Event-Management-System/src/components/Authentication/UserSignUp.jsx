import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import girlimg from '../../assets/logingirl.jpg'
import axios from "axios"
import './login.css'
function UserSignUp() {

  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    first_name:"",
    last_name :"",
    email : "",
    phone:"",
    password:""
  })
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(registerData.password != confirmPassword){
      setPasswordMatchError('Passwords do not match');
      return
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/Authentication/register/', registerData);
      console.log(response.data); // Assuming your API returns a success message or user data upon successful registration
      // Reset form data after successful registration
      if(response.data.status === 200){
        alert("Account Created Successfully");
        navigate('/login');
      }
      setPasswordMatchError('');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  const handleConfirm = (e) =>{
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
                  type="text" name="first_name"
                  value={registerData.first_name}
                  onChange={handleChange}
                  required />
                <span>First Name</span>
              </div>

              <div className="input-box">
                <input type="text" name="last_name"
                  value={registerData.last_name}
                  onChange={handleChange}
                  required 
                />
                <span>Last Name</span>
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
                <input type="text" name="phone"
                  value={registerData.phone}
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