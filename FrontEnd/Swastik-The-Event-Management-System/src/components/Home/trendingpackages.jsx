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
    // const products = [
    //     {
    //         img:img1, 
    //         name:"Bark-Birthday",
    //         desc:"Bark Birthday Cakes, Celebrations, Drinks, Caters and many mores.",
    //         rate:"₹9,999/-",
    //         sold:"200+"
    //     },
    //     {
    //         img :img2,
    //         name:"Corporate Dinner Party",
    //         desc:"Bark Birthday Cakes, Celebrations, Drinks, Caters and many mores.",
    //         rate:"₹20,000/-",
    //         sold:"200+"
    //     },
    //     {
    //         img :img3,
    //         name:"New Diamond Year",
    //         desc:"Bark Birthday Cakes, Celebrations, Drinks, Caters and many mores.",
    //         rate:"₹20,999/-",
    //         sold:"200+",
    //     },
    //     {
    //         img :img11,
    //         name:"Destination-Wedding",
    //         desc:"Crafting Jaipur Dreams, where love meets Royalty",
    //         rate:"₹59,99,999/-",
    //         sold:"200+",
    //     },
    //     {
    //         img :img5,
    //         name:"Dj-Concert",
    //         desc:"Bark Birthday Cakes, Celebrations, Drinks, Caters and many mores.",
    //         rate:"₹51,099/-",
    //         sold:"200+",
    //     },
    //     {
    //         img :img6,
    //         name:"Aniversary-Heart",
    //         desc:"Bark Birthday Cakes, Celebrations, Drinks, Caters and many mores.",
    //         rate:"₹50,000/-",
    //         sold:"200+",
    //     }  
    // ]
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8000/api/v1/product/get-product');
              console.log(response.data.statusCode)
              setProducts(response.data.data.products)
            } catch (error) {
              console.error('Error fetching data: ', error);
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
                            <Product key={product._id} img={product.productImage} name={product.productName} desc={product.productDescription} rate={product.productPrice} sold={product.productSold} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TrendingPackages;