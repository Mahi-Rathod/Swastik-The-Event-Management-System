import React, { useEffect, useState } from 'react'
import Product from "./../../Products/product.jsx"
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MarriageEvents() {
  const [status, setStatus] = useState("All");
  const [selectedState, setSelectedState] = useState("");
  const [products, setProducts] = useState([]);
  const [upTo100000, setUpTo100000] = useState([]);
  const [inRange, setInRange] = useState([]);
  const [above1000000, setAbove1000000] = useState([]);
  const { id } = useParams();
  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const handleSelect = (e) => {
    setSelectedState(e.target.value);
  };

  const handleClick = (e) => {
    setStatus(e.target.value);
  }

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/get-products-by-category/${id}`);
        const products = res.data.data.products
        console.log(res.data.data.products)
        setProducts(res.data.data.products);
      } catch (error) {
        console.log(error)
      }

    }

    const filtered = () => {
      const upTo100000 = products.filter(product => parseInt(product.productPrice, 10) <= 100000);
      const inRange = products.filter(product => {
        const price = parseInt(product.productPrice, 10);
        return price > 100000 && price <= 1000000;
      });
      const above1000000 = products.filter(product => parseInt(product.productPrice, 10) > 1000000);

      setUpTo100000(upTo100000);
      setInRange(inRange);
      setAbove1000000(above1000000);
    }

    fetchData();
    filtered();
  }, [status, selectedState])

  const filteredProducts = status === "All"
    ? products
    : products.filter(product => product.price === status);


  return (
    <div className="w-[90%] m-auto flex flex-row justify-evenly p-2 gap-3">
      <aside className="w-[20%] h-[100vh] bg-white shadow-md flex flex-col p-3">
        <h1 className="bg-gray-300 w-[90%] text-black text-xl font-semibold p-1 rounded-sm my-3">Filters</h1>
        <br />
        <h1 className="w-[90%] text-black text-md font-semibold p-1 rounded-sm">Price</h1>
        <hr className="py-3" />
        <div className="flex flex-col space-y-4 ml-3">
          {["All", 'Upto 100000', '100000 To 1000000', 'Above 1000000'].map((option) => (
            <label key={option} className="flex cursor-pointer">
              <input
                type="radio"
                name="status"
                value={option}
                className="hidden peer"
                checked={status === option}
                onChange={handleClick}
              />
              <span className="w-4 h-4 border-2 border-blue-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-transparent"></span>
              <span className="ml-2 text-gray-700 font-semibold">{option}</span>
            </label>
          ))}
        </div>
        <br /><br />
        <h1 className="w-[90%] text-black text-md font-semibold p-1 rounded-sm">State</h1>
        <hr className="py-3" />
        <div className="flex flex-col space-y-4 ml-3">
          <select
            name="selectedStates"
            value={selectedState}
            onChange={handleSelect}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="">Select a state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <aside className="w-[80%] mr-auto ml-auto text-center p-2">
        <section className='flex flex-wrap gap-4 w-full items-start justify-evenly bg-white p-4'>
          {
            status === "All" && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                    <div className="w-full">
                      <h2 className='text-2xl font-bold'>You don't have any Products</h2>
                    </div>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      img={product.productImage}
                      name={product.productName}
                      desc={product.productDescription}
                      rate={product.productPrice}
                      sold={product.productSold}
                    />
                  ))
                )}
              </>
            )
          }

          {
            status === "Upto 100000" && (
              <>
                {upTo100000.length === 0 ? (
                  <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                    <div className="w-full">
                      <h2>You don't have any Pending Events</h2>
                    </div>
                  </div>
                ) : (
                  upTo100000.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      img={product.productImage}
                      name={product.productName}
                      desc={product.productDescription}
                      rate={product.productPrice}
                      sold={product.productSold}
                    />
                  ))
                )}
              </>
            )
          }

          {
            status === "100000 To 1000000" && (
              <>
                {inRange.length === 0 ? (
                  <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                    <div className="w-full">
                      <h2 className='text-2xl font-bold'>You don't have any Completed Events</h2>
                    </div>
                  </div>
                ) : (
                  inRange.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      img={product.productImage}
                      name={product.productName}
                      desc={product.productDescription}
                      rate={product.productPrice}
                      sold={product.productSold}
                    />
                  ))
                )}
              </>
            )
          }
          {
            status === "Above 1000000" && (
              <>
                {above1000000.length === 0 ? (
                  <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                    <div className="w-full">
                      <h2 className='text-2xl font-bold'>You don't have any Completed Events</h2>
                    </div>
                  </div>
                ) : (
                  above1000000.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      img={product.productImage}
                      name={product.productName}
                      desc={product.productDescription}
                      rate={product.productPrice}
                      sold={product.productSold}
                    />
                  ))
                )}
              </>
            )
          }
        </section>
      </aside>
    </div>
  )
}

export default MarriageEvents