const mongoose = require("mongoose");
const argon2 = require("argon2");

const { Schema, model } = mongoose;

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// validate email
authSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} not valid email`
);

// validate email exist
authSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("user").estimatedDocumentCount({
        email: value,
      });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} already exist`
);

// hash password before save
authSchema.pre("save", async function (next) {
  try {
    this.password = await argon2.hash(this.password);
  } catch (error) {
    throw error;
  }
  next();
});

module.exports = model("auth", authSchema);
