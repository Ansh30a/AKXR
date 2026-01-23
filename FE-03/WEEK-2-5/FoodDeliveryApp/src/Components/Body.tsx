import RestaurantCard from "./RestaurantCard";
// import React from 'react';

const Body = () => {
  return (
    <div className="body">
        <div className="search-bar">Search</div>
        <div className="restaurant-container">
            <RestaurantCard />
        </div>
    </div>
  );
};

export default Body;
