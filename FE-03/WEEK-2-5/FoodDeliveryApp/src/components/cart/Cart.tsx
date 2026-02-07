import { useAppSelector } from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { clearCart, removeItemById } from "../../features/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useAppSelector((store) => store.cart.items);

    return (
        <div className="flex justify-center mt-6">
            {/* Center container */}
            <div className="w-full max-w-3xl px-4">
                <div className="font-semibold flex flex-wrap items-center text-lg gap-3 justify-center mb-3">
                    <h1 className="text-2xl font-bold text-center">
                        Your Cart
                    </h1>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="px-3 hover:scale-110 transition"
                    >
                        <img
                            src="/trash.svg"
                            alt="Remove item"
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <p className="text-center mt-4">Your cart is empty 🛒</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                            >
                                {/* Left: image + name */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            item.imageId
                                                ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fit/${item.imageId}`
                                                : "/food-placeholder.png"
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                </div>

                                {/* Right: price */}
                                <div className="font-semibold flex items-center text-lg gap-3">
                                    <button
                                        onClick={() =>
                                            dispatch(removeItemById(item.id))
                                        }
                                        className="hover:scale-110 transition"
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <img
                                            src="/trash.svg"
                                            alt="Remove item"
                                            className="w-5 h-5"
                                        />
                                    </button>

                                    <span>₹{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
