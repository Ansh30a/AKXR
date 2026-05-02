import { Schema, model, type HydratedDocument, type Types } from "mongoose";

const connectionRequestStatuses = [
    "ignored",
    "interested",
    "rejected",
    "accepted",
] as const;

type ConnectionRequestStatus = (typeof connectionRequestStatuses)[number];

interface IConnectionRequest {
    fromUserId: Types.ObjectId;
    toUserId: Types.ObjectId;
    status: ConnectionRequestStatus;
}

type ConnectionRequestDocument = HydratedDocument<IConnectionRequest>;

const connectionRequestSchema = new Schema<IConnectionRequest>(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        toUserId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        status: {
            type: String,
            enum: {
                values: connectionRequestStatuses,
                message: `{VALUE} is incorrect status type`,
            },
            required: true,
        },
    },
    { timestamps: true },
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (this: ConnectionRequestDocument) {
    // Check if the sender and receiver are the same (both IDs are same)
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("Sender and receiver are the same.");
    }
});

const ConnectionRequest = model<IConnectionRequest>(
    "ConnectionRequest",
    connectionRequestSchema,
);

export default ConnectionRequest;
