import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { postProductStart, postProductSuccess, postProductFailure } from '../../Store/PostProductSlice'
import axios from 'axios';

function AddProducts() {
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    
    setFormData({
      ...formData, image:e.target.files[0]
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = new FormData();
    requestData.append('title',formData.title);
    requestData.append('description',formData.description)
    requestData.append('quantity',formData.quantity)
    requestData.append('price',formData.price)
    requestData.append('category',formData.category)
    requestData.append('image',formData.image)

    console.log(requestData)

    // dispatch(postProductStart());
    try {
      console.log(formData)
      const response = await axios.post("http://localhost:8000/api/v1/product/add-product", requestData);
      console.log(response.data)
    //   dispatch(postProductSuccess(data));
    } catch (err) {
    //   dispatch(postProductFailure(err.message));
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 border shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border rounded px-3 py-2"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
            <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
            <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="shoes">Shoes</option>
              {/* Add more options as needed */}
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



// import axios from 'axios'
// import React, { useEffect } from 'react'

// function AddProducts() {
    
//     const axiosInstance = axios.create({
//         baseURL: 'http://localhost:8000/api/v1/product',
//         withCredentials: true
//     });

//     const onclickHandler = async() => {
//         await axiosInstance.post("/add-product")
//     }
    
//   return (
//     <button onClick={onclickHandler}> add </button>
//   )
// }

// export default AddProducts