import { useState } from "react";
import RestaurantCard from "./RestaurantCard/RestaurantCard";
import resData from '../../utils/RestaurantData.json';
import './Body.css';

interface RestaurantInfo {
    id: string;
    name: string;
    cuisines: string[];
    avgRating: number;
    sla: {
        slaString: string;
    };
    cloudinaryImageId: string;
};


interface Restaurant {
    info: RestaurantInfo;
};


interface RestaurantData {
    restaurants: Restaurant[];
};

const Body = () => {

    const initialData = resData as RestaurantData;

    const [restaurants, setRestaurants] = useState<Restaurant[]>(initialData.restaurants);

    return (
        <div className="body">
            <div className="search-bar">
                <input type="text" placeholder="Search.." className="search-input" />
            </div>
            <div className="filter">
                <button className="filter-btn" onClick={() => {
                    const filtered = initialData.restaurants.filter(
                        (res) => res.info.avgRating >= 4
                    );
                    setRestaurants(filtered);
                }}>
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.id}
                        name={restaurant.info.name}
                        cuisine={restaurant.info.cuisines}
                        rating={restaurant.info.avgRating}
                        eta={restaurant.info.sla.slaString}
                        imageId={restaurant.info.cloudinaryImageId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
