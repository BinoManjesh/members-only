import { Schema, model, ObjectId } from "mongoose";

const MessageSchema = new Schema(
  {
    title: String,
    content: String,
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

MessageSchema.virtual("createdAtFormatted").get(function () {
  return `${this.createdAt.getDate()}/${this.createdAt.getMonth() + 1}/${this.createdAt.getFullYear()}`;
});

export default model("Message", MessageSchema);
