// import { useState, useEffect } from 'react';
// import Shimmer from '../Shimmer/Shimmer';
import './RestaurantMenuPage.css';

// interface RestaurantInfo {
//     name: string;
// };

// interface CardInner {
//     info: RestaurantInfo;
// };

// interface CardMiddle {
//     card: CardInner;
// };

// interface CardOuter {
//     card: CardMiddle;
// };

// interface MenuResponse {
//     cards: CardOuter[];
// };

const RestaurantMenuPage = () => {

    // const [resInfo, setResInfo] = useState<MenuResponse | null>(null);

    // useEffect(() => {
    //     const fetchMenu = async () => {
    //         const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4779617&lng=77.3288359&restaurantId=605415&catalog_qa=undefined&submitAction=ENTER`);
    //         const json = await data.json();
    //         setResInfo(json.data);
    //     };

    //     fetchMenu();
    // }, []);

    // if (resInfo === null) {
    //     return <Shimmer />
    // }

    return (
        <div>
            {/* <h1>{resInfo.cards[2]?.card?.card?.info?.name}</h1> */}
            <h1>Name</h1>
            <h2>Menu</h2>
        </div>
    );
};

export default RestaurantMenuPage;
