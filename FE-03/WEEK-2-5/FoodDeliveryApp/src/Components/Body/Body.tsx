import { useState } from "react";
// import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard/RestaurantCard";
import resData from '../../utils/RestaurantData.json';
// import Shimmer from "../Shimmer/Shimmer";
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

    // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>(initialData.restaurants);

    const [searchBarText, setSearchBarText] = useState("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetch(import.meta.env.VITE_SWIGGY_API);
    //         const json = await data.json();
    //         setRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    //     };

    //     fetchData();
    // }, []);

    // if (restaurants.length === 0) {
    //     return <Shimmer />
    // }

    return ( // ---- restaurants.length === 0 ? <Shimmer /> :
        <div className="body">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search.." 
                    className="search-input" 
                    value={searchBarText} 
                    onChange={(e) => {setSearchBarText(e.target.value)}} 
                />
                <button
                    onClick={() => {
                    const filtered = initialData.restaurants.filter(
                        (res) => res.info.name.toLowerCase().includes(searchBarText.toLowerCase())
                    );
                    setRestaurants(filtered);
                }}                    
                >
                    Search
                </button>
            </div>
            <div className="filter">
                <button 
                    className="filter-btn" 
                        onClick={() => {
                            const filtered = initialData.restaurants.filter(
                                (res) => res.info.avgRating >= 4
                            );
                            setRestaurants(filtered);
                        }}
                >
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
