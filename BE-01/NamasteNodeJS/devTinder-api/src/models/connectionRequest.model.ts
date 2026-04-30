import { Schema, model } from "mongoose";

const connectionRequestSchema = new Schema(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        toUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: {
                values: ["ignored", "interested", "rejected", "accepted"],
                message: `{VALUE} is incorrect status type`,
            },
            required: true,
        },
    },
    { timestamps: true },
);

const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;
