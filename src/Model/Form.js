const mongoose = require("mongoose");
const { Schema } = mongoose;

const formDataSchema = new Schema({
  key: { type: String, required: true },
  type: { type: String, required: true, enum: ["bubble", "input"] },
  value: { type: String, required: true },
  inputValue: { type: String },
  theme: { type: String, required: true },
});

const formSchema = new Schema({
  formName: { type: String, required: true },
  formData: [formDataSchema],
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  link: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
