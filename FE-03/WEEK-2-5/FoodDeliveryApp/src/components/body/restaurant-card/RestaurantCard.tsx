import { Link } from "react-router-dom";
import "./RestaurantCard.css";

interface RestaurantCardProps {
    id: string;
    name: string;
    cuisine: string[];
    rating: number;
    eta: string;
    imageId: string;
}

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

const RestaurantCard = ({
    id,
    name,
    cuisine,
    rating,
    eta,
    imageId,
}: RestaurantCardProps) => {
    return (
        <Link to={`/restaurants/${id}`} className="restaurant-card-link">
            <div className="restaurant-card bg-amber-50">
                {/* <img src="https://images.pexels.com/photos/33428723/pexels-photo-33428723.jpeg" alt={name} /> */}
                <img src={CLOUDINARY_BASE_URL + imageId} alt={name} />
                <div className="left-4 ml-8">
                    <h3 className="font-bold text-xl">{name}</h3>
                    <h4 className="font-semibold text-sm mt-4">
                        {cuisine.join(", ")}
                    </h4>
                    <h4 className="flex items-center mt-5">
                        <img src="/star.svg" alt="" className="w-8 p-2" />
                        {rating}
                    </h4>
                    <h4 className="flex items-center mt-5">
                        <img src="/clock.svg" alt="" className="p-2" />
                        {eta}
                    </h4>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
