import { Link } from 'react-router-dom';
import './RestaurantCard.css';

interface RestaurantCardProps {
    id: string; 
    name: string;
    cuisine: string[];
    rating: number;
    eta: string;
    imageId: string;
};

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

const RestaurantCard = ({ id, name, cuisine, rating, eta, imageId }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurants/${id}`} className="restaurant-card-link">
        <div className="restaurant-card">
            {/* <img src="https://images.pexels.com/photos/33428723/pexels-photo-33428723.jpeg" alt={name} /> */}
            <img
                src={CLOUDINARY_BASE_URL + imageId}
                alt={name}
            />
            <h3>{name}</h3>
            <h4>{cuisine.join(", ")}</h4>
            <h4>⭐ {rating}</h4>
            <h4>{eta}</h4>
        </div>
    </Link>
  );
};

export default RestaurantCard;
