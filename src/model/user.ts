import { Model, Document, Schema, model } from "mongoose";
import argon2 from "argon2";

//An interface that describes the properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes the properties that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
  validatePassword(password: string): Promise<boolean>;
}
//An interface that describes the properties that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<UserDoc>("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  }
  done();
});

userSchema.methods.validatePassword = function (
  password: string
): Promise<boolean> {
  return argon2.verify(this.password, password);
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
