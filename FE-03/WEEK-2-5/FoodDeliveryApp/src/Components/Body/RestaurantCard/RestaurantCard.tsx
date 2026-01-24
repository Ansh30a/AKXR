import './RestaurantCard.css';

interface RestaurantCardProps {
    name: string;
    cuisine: string[];
    rating: number;
    eta: string;
    imageId: string;
};

const CLOUDINARY_BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const RestaurantCard = ({ name, cuisine, rating, eta, imageId }: RestaurantCardProps) => {
  return (
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
  );
};

export default RestaurantCard;
