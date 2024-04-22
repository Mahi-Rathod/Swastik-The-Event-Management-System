import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function AddProducts() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [otherEvents, setOtherEvents] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    category: "",
    foodType: "",
    decorationType: "",
    otherEvents: "",
    totalGuests: "",
    productImage: null
  })

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get("http://localhost:8000/api/v1/category/get-category");
      setCategories(responseData.data.data.categories)
    }

    fetchData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otherEvents") {
      setOtherEvents(otherEvents + value);
      setFormData({
        ...formData,
        [name]: otherEvents
      })
      console.log(otherEvents)
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData, productImage: e.target.files[0]
    });
  }
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/product',
    withCredentials: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const requestData = new FormData();
    requestData.append('productName', formData.productName);
    requestData.append('productDescription', formData.productDescription);
    requestData.append('productPrice', formData.productPrice)
    requestData.append('category', formData.category)
    requestData.append('productImage', formData.productImage)
    requestData.append('foodType', formData.foodType)
    requestData.append('decorationType', formData.decorationType)
    if (formData.category === "661c44541e28b02ab8589989") {
      requestData.append('otherEvents', formData.otherEvents)
    }
    else {
      requestData.append('otherEvents', "No Other Events")
    }
    requestData.append('totalGuests', formData.totalGuests)

    try {
      const response = await axiosInstance.post("/add-product", requestData);
      if (response.data.statusCode === 201) {
        navigate('/')
      }
    }
    catch (error) {
      console.log("something went wrong")
    }
  }
  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 border shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Package</h2>
        <form encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Package Name:</label>
            <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} rows="4" className="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Price:</label>
            <input type="text" id="productPrice" name="productPrice" value={
              formData.productPrice} onChange={handleChange} step="0.01" className="w-full border rounded px-3 py-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
            <select id="category" name="category" value={formData.category._id} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {
                categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.categoryName}</option>
                ))
              }

            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="foodType" className="block text-gray-700 font-bold mb-2">Food Type:</label>
            <select id="foodType" name="foodType" value={formData.foodType} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Maharashtrian Food"> Maharashtrian Food </option>
              <option value="South Indian Food"> South Indian Food </option>
              <option value="Chinese Food"> Chinese Food </option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="decorationType" className="block text-gray-700 font-bold mb-2">Decoration Type:</label>
            <select id="decorationType" name="decorationType" value={formData.decorationType} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Floral Decorations"> Floral Decorations </option>
              <option value="Baloon Decorations"> Baloon Decorations </option>
              <option value="Ethinic Decorations"> Ethinic Decorations</option>
              <option value="Open Decorations"> Open Decorations</option>
            </select>
          </div>

          {formData.category === "661c44541e28b02ab8589989" &&
            <div className="mb-4">
              <label htmlFor="decorationType" className="block text-gray-700 font-bold mb-2">Other Events:</label>
              <div>
                <input name="otherEvents" value=" Mehandi Ceremony" type="checkbox" onChange={handleChange} />
                <span> Mehandi Ceremony </span>
              </div>

              <div>
                <input name="otherEvents" value=" Sangeet Ceremony" type="checkbox" onChange={handleChange} />
                <span> Sangeet Ceremony </span>
              </div>

              <div>
                <input name="otherEvents" value=" Haldi Ceremony" type="checkbox" onChange={handleChange} />
                <span> Haldi Ceremony </span>
              </div>

              <div>
                <input name="otherEvents" value=" Vidai Ceremony" type="checkbox" onChange={handleChange} />
                <span> Vidai Ceremony </span>
              </div>
            </div>
          }

          <div className="mb-4">
            <label htmlFor="decorationType" className="block text-gray-700 font-bold mb-2">Total Guest Allowed:</label>
            <input name="totalGuests" value={formData.totalGuests} type="number" onChange={handleChange} placeholder='0'/>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image:</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddProducts
