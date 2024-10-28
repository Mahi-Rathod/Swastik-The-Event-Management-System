import './trendingpackages.css'
import Product from '../Products/product';
import axios from 'axios'
import img1 from '../../assets/packages/img1.jpg'
import img2 from '../../assets/packages/img2.jpg'
import img3 from '../../assets/packages/img3.jpg'
import img11 from '../../assets/packages/img11.jpg'
import img5 from '../../assets/packages/img5.jpg'
import img6 from '../../assets/packages/img6.jpg'
import { useEffect,useState } from 'react';

function TrendingPackages(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/get-products`);
              setProducts(response.data.data.products)
            } catch (error) {
              console.log('Error fetching data: ', error);
            }
          };
      
          fetchData();
    }, [])
    
    
    return(
        <>
            <div className="package-menu">
                <h1 className="trends">Trending Packages</h1>
                <div className="product-1">
                    {products.map((product)=>{
                        return(
                            <Product key={product._id} id={product._id} img={product.productImage} name={product.productName} desc={product.productDescription} rate={product.productPrice} sold={product.productSold} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TrendingPackages;