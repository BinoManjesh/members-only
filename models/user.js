import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  accessLevel: Number,
});

export default model("User", UserSchema);
