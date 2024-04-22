import React, { useEffect, useState } from 'react'
import axios from 'axios';

function AddProducts() {

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    category: "",
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
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData, productImage: e.target.files[0]
    });
  }
  const axiosInstance = axios.create({
    // Your backend URL
    baseURL: 'http://localhost:8000/api/v1/product',
    // Set credentials to include cookies with each request
    withCredentials: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = new FormData();
    requestData.append('productName', formData.productName);
    requestData.append('productDescription', formData.productDescription);
    requestData.append('productPrice', formData.productPrice)
    requestData.append('category', formData.category)
    requestData.append('productImage', formData.productImage)

    console.log(formData.productImage)
    try {
      const response = await axiosInstance.post("/add-product", requestData);
      if (response.data.statusCode === 201) {
        console.log("hii bhai check karle pahle")
        setFormData({
          ...formData,
          productName: "",
          productDescription: "",
          productPrice: "",
          category: "",
          productImage: null
        })
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
