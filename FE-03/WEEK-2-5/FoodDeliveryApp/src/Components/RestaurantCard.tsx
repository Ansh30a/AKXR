import './RestaurantCard.css';

interface RestaurantCardProps {
    name: string;
    cuisine: string[];
    rating: number;
    eta: string;
};

const RestaurantCard = ({ name, cuisine, rating, eta }: RestaurantCardProps) => {
  return (
    <div className="restaurant-card">
        <img src="https://images.pexels.com/photos/33428723/pexels-photo-33428723.jpeg" alt="" />
        <h3>{name}</h3>
        <h4>{cuisine}</h4>
        <h4>{rating}</h4>
        <h4>{eta}</h4>
    </div>
  );
};

export default RestaurantCard;
