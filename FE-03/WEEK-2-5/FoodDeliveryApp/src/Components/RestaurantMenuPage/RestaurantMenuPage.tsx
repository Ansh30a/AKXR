import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer";
import MenuData from "../../utils/MenuData.json";
import "./RestaurantMenuPage.css";

interface ItemInfo {
    id: string;
    name: string;
    price?: number;
    defaultPrice?: number;
    description?: string;
    imageId?: string;
}

interface ItemCard {
    card: {
        info: ItemInfo;
    };
}

interface CategoryInfo {
    title: string;
    itemCards?: ItemCard[];
}

interface MenuCard {
    card: {
        card: CategoryInfo;
    };
}

interface RestaurantSla {
    deliveryTime: number;
    slaString: string;
}

interface RestaurantInfo {
    id: string;
    name: string;
    cuisines: string[];
    avgRating: number;
    costForTwoMessage: string;
    sla: RestaurantSla;
}

interface RestaurantCard {
    card: {
        card: {
            info: RestaurantInfo;
        };
    };
}

interface MenuResponse {
    data: {
        cards: RestaurantCard[] | MenuCard[];
    };
}

const RestaurantMenuPage = () => {
    const { resId } = useParams<{ resId: string }>();
    const [resInfo, setResInfo] = useState<MenuResponse | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            setResInfo(MenuData as MenuResponse);
        }, 500);
    }, [resId]);

    if (resInfo === null) {
        return <Shimmer />;
    }

    const isRestaurantCard = (
        card: RestaurantCard | MenuCard,
    ): card is RestaurantCard => {
        return "info" in card.card.card;
    };

    const restaurantCard = resInfo.data.cards[2] as RestaurantCard;
    const restaurantInfo = restaurantCard.card.card.info;
    const restaurantName = restaurantInfo.name;
    const cuisines = restaurantInfo.cuisines.join(", ");
    const costForTwo = restaurantInfo.costForTwoMessage;
    const rating = restaurantInfo.avgRating;
    const deliveryTime = restaurantInfo.sla.deliveryTime;

    const menuCards =
        ((resInfo.data.cards[4] as any)?.groupedCard?.cardGroupMap?.REGULAR
            ?.cards as MenuCard[]) || [];

    return (
        <div className="restaurant-menu">
            <div className="restaurant-header">
                <h1>{restaurantName}</h1>
                <p className="restaurant-id">Restaurant ID: {resId}</p>
                <p>{cuisines}</p>
                <div className="restaurant-meta">
                    <span>⭐ {rating}</span>
                    <span>🕐 {deliveryTime} mins</span>
                    <span>{costForTwo}</span>
                </div>
            </div>

            <h2>Menu</h2>
            <p className="menu-note">
                Note: Currently showing sample menu data. In production, each
                restaurant would have its own menu.
            </p>
            <div className="menu-categories">
                {menuCards.map((card: MenuCard, index: number) => {
                    const categoryInfo = card.card.card;

                    if (categoryInfo.itemCards) {
                        return (
                            <div key={index} className="menu-category">
                                <h3>
                                    {categoryInfo.title} (
                                    {categoryInfo.itemCards.length})
                                </h3>
                                <div className="menu-items">
                                    {categoryInfo.itemCards.map(
                                        (item: ItemCard, itemIndex: number) => {
                                            const itemInfo = item.card.info;
                                            return (
                                                <div
                                                    key={itemIndex}
                                                    className="menu-item"
                                                >
                                                    <div className="item-details">
                                                        <h4>{itemInfo.name}</h4>
                                                        <p className="item-price">
                                                            ₹
                                                            {(itemInfo.price ||
                                                                itemInfo.defaultPrice ||
                                                                0) / 100}
                                                        </p>
                                                        {itemInfo.description && (
                                                            <p className="item-description">
                                                                {
                                                                    itemInfo.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    {itemInfo.imageId && (
                                                        <img
                                                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`}
                                                            alt={itemInfo.name}
                                                            className="item-image"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default RestaurantMenuPage;
