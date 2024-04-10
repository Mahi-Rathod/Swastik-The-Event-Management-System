import React, { useEffect } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import girlimg from '../../assets/logingirl.jpg'
import { useState } from 'react'
import axios from "axios"
import './login.css'
import { useDispatch,useSelector} from 'react-redux'
import { loginSuccess } from '../../Store/authSlice'
function UserSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkAuth = useSelector((state) => state.authentication.status);
  const [registerData, setRegisterData] = useState({
    mobileNumber : "",
    password:"",
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
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', registerData);
      console.log(response.data); // Assuming your API returns a success message or user data upon successful registration
      // Reset form data after successful registration
      if(response.data.statusCode === 200){
        // alert("Logged In");
        dispatch(loginSuccess());
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <div className='w-[90%] h-[90vh] m-auto flex justify-center items-center'>
    {/* <h1>{fetchResult}</h1> */}
      <div className='w-[80%] h-[80vh] flex gap-2'>
        <div className='w-2/4 h-full rounded bg-white flex justify-center items-center'>
          <img src={girlimg} alt="" />
        </div>
        <div className='w-2/4 h-full bg-white rounded flex flex-col justify-evenly items-center'>

          <div className="font-mono text-3xl font-extrabold">
            <h3>Login Here</h3>
          </div>

          <div className='p-5 rounded drop-shadow-md'>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className="input-box">
                <input type="text" name="mobileNumber"
                  value={registerData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <span>mobileNumber</span>
              </div>


              <div className="input-box">
                <input type="password" name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                />
                <span>Password</span>
              </div>
              
              <div className='submit-btn'>
                <button>Login</button>
              </div>

            </form >
          </div>

          <div className='text-[0.9rem] flex flex-col'>
            <p className='font-mono text-black'>New User - <NavLink to="/signup" className="text-[0.7rem] text-blue-600 drop-shadow-lg">SignUp here</NavLink></p>
            {/* <p className='font-mono text-black'>Are you an vendor? <NavLink to="/vendor-sign-in" className="text-[0.7rem] text-blue-600 drop-shadow-lg">login here</NavLink></p> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserSignIn