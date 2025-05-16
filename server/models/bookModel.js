import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: { 
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: { 
      type: Number,
      required: true,
      default: 0,
    },
    availability: { 
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } 
);

export const Book = mongoose.model("Book", bookSchema);
export default Book;
