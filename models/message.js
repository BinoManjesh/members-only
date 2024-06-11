import { Schema, model, ObjectId } from "mongoose";

const MessageSchema = new Schema(
  {
    title: String,
    content: String,
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("Message", MessageSchema);
