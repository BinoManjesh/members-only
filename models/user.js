import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  accessLevel: Number,
});

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

export default model("User", UserSchema);
