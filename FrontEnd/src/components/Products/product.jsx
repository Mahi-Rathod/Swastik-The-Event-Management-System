import './product.css'
import { FaRegHeart } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';
function Product({ id, img, name, desc, rate, sold }) {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/services/book-package/${id}`);
    };

    return (
        <div className="product-container" style={{ backgroundImage: `url(${img})` }}>
            <div className="details">
                <h3 className="name">{name}</h3>
                <p className="fav-desc">{desc}</p>
                <div className="rate-sold">
                    <p>{sold}</p>
                    <p>{rate}</p>
                </div>
                <button className='Book-Now' onClick={handleBookNow}>Book</button>
            </div>
            <div className="product-details">
                <div className="name-heart">
                    <h3 className="name">{name}</h3>
                    <h3 className='heart'><FaRegHeart /></h3>
                </div>
                <div className="rate-sold">
                    <p><b>Sold:</b>{sold}</p>
                    <p><b>{rate}</b></p>
                </div>
            </div>
        </div>
    );
}
export default Product;