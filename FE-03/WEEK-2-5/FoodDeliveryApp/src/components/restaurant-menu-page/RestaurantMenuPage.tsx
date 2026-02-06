import { useParams } from "react-router-dom";
import Shimmer from "../shimmer/Shimmer";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import type { MenuCard } from "../../hooks/useRestaurantMenu";
import "./RestaurantMenuPage.css";

const RestaurantMenuPage = () => {
    const { resId } = useParams<{ resId: string }>();

    const { restaurantInfo, menuCards, loading } = useRestaurantMenu(resId);

    if (loading || !restaurantInfo) {
        return <Shimmer />;
    }

    const { name, cuisines, avgRating, costForTwoMessage, sla } = restaurantInfo;

    return (
        <div className="restaurant-menu">
            <div className="restaurant-header">
                <h1>{name}</h1>
                {/* <p className="restaurant-id">Restaurant ID: {resId}</p> */}
                <p>{cuisines.join(", ")}</p>
                <div className="restaurant-meta items-center">
                    <span className="flex items-center"><img src="/star.svg" alt=""className="w-8 p-2" /> {avgRating}</span>
                    <span className="flex items-center"><img src="/clock.svg" alt="" className="m-1" /> {sla.deliveryTime} mins</span>
                    <span>{costForTwoMessage}</span>
                </div>
            </div>

            <h2>Menu</h2>
            
            {/* <p className="menu-note"> Note: Currently showing sample menu data. In production, each restaurant would have its own menu. </p> */}

            <div className="menu-categories">
                {menuCards.map((card: MenuCard, index: number) => {
                    const categoryInfo = card.card.card;

                    if (!categoryInfo.itemCards) return null;

                    return (
                        <div key={index} className="menu-category">
                            <h3>
                                {categoryInfo.title} (
                                {categoryInfo.itemCards.length})
                            </h3>

                            <div className="menu-items">
                                {categoryInfo.itemCards.map(
                                    (item, itemIndex) => {
                                        const info = item.card.info;

                                        return (
                                            <div
                                                key={itemIndex}
                                                className="menu-item"
                                            >
                                                <div className="w-8/12 item-details">
                                                    <h4>{info.name}</h4>
                                                    <p className="item-price">
                                                        ₹
                                                        {(info.price ??
                                                            info.defaultPrice ??
                                                            0) / 100}
                                                    </p>
                                                    {info.description && (
                                                        <p className="item-description">
                                                            {info.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="w-4/12 relative flex flex-col items-center">
                                                    {info.imageId && (
                                                        <img
                                                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${info.imageId}`}
                                                            alt={info.name}
                                                            className="rounded-lg"
                                                        />
                                                    )}
                                                    <button className="absolute -bottom-4 mb-1 px-7 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-lg text-center hover:bg-green-800 transition">Add+</button>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RestaurantMenuPage;
