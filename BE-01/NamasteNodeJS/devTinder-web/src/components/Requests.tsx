import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import type { ConnectionRequest } from "../types/user";
import RequestCard from "./RequestCard";
import { addRequests, removeRequest } from "../slice/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();

    const requests = useSelector(
        (store: RootState) => store.requests,
    ) as ConnectionRequest[];
    const [loading, setLoading] = useState<boolean>(false);
    const [reviewingRequestId, setReviewingRequestId] = useState<string | null>(
        null,
    );
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(
                import.meta.env.VITE_BASE_API_URL + "/user/requests/received",
                { withCredentials: true },
            );
            // API returns { message, data }
            const data = res.data?.data ?? [];
            dispatch(addRequests(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const reviewRequest = async (
        status: "accepted" | "rejected",
        requestId: string,
    ) => {
        try {
            setReviewingRequestId(requestId);
            setError(null);
            await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true },
            );
            dispatch(removeRequest(requestId));
        } catch (err) {
            console.error(err);
            setError("Unable to process this request. Please try again.");
        } finally {
            setReviewingRequestId(null);
        }
    };

    useEffect(() => {
        void fetchRequests();
    }, []);

    if (loading) return <div className="p-6">Loading requests...</div>;
    if (!requests || requests.length === 0)
        return <div className="p-6">No Requests Found.</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Requests</h1>
            {error && <div className="alert alert-error mb-6">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <RequestCard
                        key={request._id}
                        request={request}
                        onReview={reviewRequest}
                        reviewingRequestId={reviewingRequestId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Requests;
