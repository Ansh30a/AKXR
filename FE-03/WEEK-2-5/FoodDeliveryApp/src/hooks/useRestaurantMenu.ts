import { useEffect, useState } from "react";
// import MenuData from '../utils/MenuData.json';

// interface ItemInfo {
//     id: string;
//     name: string;
//     price?: number;
//     defaultPrice?: number;
//     description?: string;
//     imageId?: string;
// }

// interface ItemCard {
//     card: {
//         info: ItemInfo;
//     };
// }

// interface CategoryInfo {
//     title: string;
//     itemCards?: ItemCard[];
// }

// export interface MenuCard {
//     card: {
//         card: CategoryInfo;
//     };
// }

// interface RestaurantSla {
//     deliveryTime: number;
// }

// export interface RestaurantInfo {
//     id: string;
//     name: string;
//     cuisines: string[];
//     avgRating: number;
//     costForTwoMessage: string;
//     sla: RestaurantSla;
// }

// interface RestaurantCard {
//     card: {
//         card: {
//             info: RestaurantInfo;
//         };
//     };
// }

// interface MenuResponse {
//     data: {
//         cards: unknown[];
//     };
// }

// interface RegularMenuWrapper {
//     groupedCard?: {
//         cardGroupMap?: {
//             REGULAR?: {
//                 cards?: MenuCard[];
//             };
//         };
//     };
// }

export interface MenuItem {
    id: string;
    name: string;
    price?: number;
    defaultPrice?: number;
    description?: string;
    imageId?: string;
}

interface MenuCategory {
    title: string;
    itemCards?: Array<{
        card: {
            info: MenuItem;
        };
    }>;
}

export interface MenuCard {
    card: {
        card: MenuCategory;
    };
}

interface RestaurantInfo {
    id: string;
    name: string;
    cuisines: string[];
    avgRating: number;
    costForTwoMessage: string;
    sla: {
        deliveryTime: number;
    };
}

// const useRestaurantMenu = (resId?: string) => {
//     const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(
//         null,
//     );
//     const [menuCards, setMenuCards] = useState<MenuCard[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!resId) return;

//         // setTimeout(() => {
//         const fetchData = async () => {
//             // const data = MenuData as MenuResponse;

//             const data = await fetch(`${import.meta.env.VITE_AKXR_MENU_API}${resId}`);

//             const json = await data.json() as MenuResponse;

//             const restaurantCard = json?.data.cards[2] as RestaurantCard;
//             const info = restaurantCard.card.card.info;

//             const regularMenuCard = json?.data.cards[4] as RegularMenuWrapper;

//             const menu =
//                 regularMenuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards ??
//                 [];

//             setRestaurantInfo(info);
//             setMenuCards(menu);
//             setLoading(false);
//         };

//         fetchData();

//     }, [resId]);

//     return { restaurantInfo, menuCards, loading };
// };

const useRestaurantMenu = (resId?: string) => {
    const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(
        null,
    );
    const [menuCards, setMenuCards] = useState<MenuCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!resId) return;

        const fetchData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_AKXR_MENU_API}${resId}`,
            );
            const json = await response.json();

            const restaurantCard = json?.data.cards[2] as {
                card: { card: { info: RestaurantInfo } };
            };
            const info = restaurantCard.card.card.info;

            const regularMenuCard = json?.data.cards[4] as {
                groupedCard?: {
                    cardGroupMap?: {
                        REGULAR?: {
                            cards?: MenuCard[];
                        };
                    };
                };
            };

            const menu =
                regularMenuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards ??
                [];

            setRestaurantInfo(info);
            setMenuCards(menu);
            setLoading(false);
        };

        fetchData();
    }, [resId]);

    return { restaurantInfo, menuCards, loading };
};

export default useRestaurantMenu;
