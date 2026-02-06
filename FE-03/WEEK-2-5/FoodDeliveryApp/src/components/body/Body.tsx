// import { useState } from "react";
import { useEffect, useState } from "react";
import RestaurantCard from "./restaurant-card/RestaurantCard";
import withOpenLabel from "../label/OpenLabel";
import resData from "../../utils/RestaurantData.json";
import Shimmer from "../shimmer/Shimmer";
// import useOnlineStatus from "../../Hooks/useOnlineStatus";
import "./Body.css";

// interface RestaurantInfo {
//     id: string;
//     name: string;
//     cuisines: string[];
//     avgRating: number;
//     sla: {
//         slaString: string;
//     };
//     cloudinaryImageId: string;
//     isOpen: boolean;
// }

// interface Restaurant {
//     info: RestaurantInfo;
// }

// interface RestaurantData {
//     restaurants: Restaurant[];
// }

interface Restaurant {
    info: {
        id: string;
        name: string;
        cuisines: string[];
        avgRating: number;
        sla: { slaString: string };
        cloudinaryImageId: string;
        isOpen: boolean;
    };
}

const Body = () => {
    const initialData = resData as { restaurants: Restaurant[] };

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    // const [restaurants, setRestaurants] = useState<Restaurant[]>(
    //     initialData.restaurants,
    // );

    const [searchBarText, setSearchBarText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            // const data = await fetch(import.meta.env.VITE_SWIGGY_API);
            const data = await fetch(import.meta.env.VITE_AKXR_SWIGGY_API);
            const json = await data.json();
            setRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        };

        fetchData();
    }, []);

    if (restaurants.length === 0) {
        return <Shimmer />
    }

    const RestaurantCardOpen = withOpenLabel(RestaurantCard);

    // const onlineStatus = useOnlineStatus();

    // if (onlineStatus === false) {
    //     return <h1>You're Offline!!!</h1>;
    // }

    return (
        // ---- restaurants.length === 0 ? <Shimmer /> :
        <div className="body">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search.."
                    className="search-input"
                    value={searchBarText}
                    onChange={(e) => {
                        setSearchBarText(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        const filtered = initialData.restaurants.filter((res) =>
                            res.info.name
                                .toLowerCase()
                                .includes(searchBarText.toLowerCase()),
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
                            (res) => res.info.avgRating >= 4,
                        );
                        setRestaurants(filtered);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {restaurants.map((restaurant) => {
                    const CardComponent = restaurant.info.isOpen
                    ? RestaurantCardOpen
                    : RestaurantCard;
                    return (
                        <CardComponent
                            key={restaurant.info.id}
                            id={restaurant.info.id}
                            name={restaurant.info.name}
                            cuisine={restaurant.info.cuisines}
                            rating={restaurant.info.avgRating}
                            eta={restaurant.info.sla.slaString}
                            imageId={restaurant.info.cloudinaryImageId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Body;
