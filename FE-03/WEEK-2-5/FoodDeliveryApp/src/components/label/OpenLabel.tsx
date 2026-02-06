/* Higher Order Component
    --> InPut -> Takes RestaurantCard
    --> OutPut -> RestaurantCardOpen
*/

const withOpenLabel = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
) => {
    return (props: P) => {
        return (
            <div className="relative">
                <span
                    className="absolute top-10 left-2 z-10 
                         bg-black text-white 
                         text-xs font-semibold 
                         px-2 py-1 rounded-md shadow"
                >
                    Open
                </span>
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default withOpenLabel;