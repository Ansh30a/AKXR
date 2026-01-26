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
    const data = resData as RestaurantData;

    return (
        <div className="body">
            <div className="search-bar"><input type="text" placeholder="Search.." className="search-input" /></div>
            <div className="restaurant-container">
                {data.restaurants.map((restaurant) => (
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
