import RestaurantCard from "./RestaurantCard";
import './Body.css';

const Body = () => {
  return (
    <div className="body">
        <div className="search-bar">Search</div>
        <div className="restaurant-container">
            <RestaurantCard name="KFC" rating={4.0} cuisine={["North Indian"]} eta="30 mins" />
            <RestaurantCard name="McD" rating={4.2} cuisine={["Fast Food"]} eta="30 mins" />
        </div>
    </div>
  );
};

export default Body;
