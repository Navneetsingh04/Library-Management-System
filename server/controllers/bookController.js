import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";

export const addBooks = catchAsyncErrors(async (req, res, next) => {
    const {title, author, description, price, quantity} = req.body;
    if(!title || !author || !description || !price || !quantity){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const book = await Book.create({
        title,
        author,
        description,
        price,
        quantity,
    });
    res.status(201).json({
        success: true,
        message: "Book is added successfully",
        book,
    });
});


export const getBooks = catchAsyncErrors(async (req, res, next) => {
   const books = await Book.find();
    res.status(200).json({
        success: true,
        books,
    });
});


export const deleteBooks = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book){
        return next(new ErrorHandler("Book not found", 404));
    }
    await book.deleteOne();
    res.status(200).json({
        success: true,
        message: "Book is deleted successfully",
    });
});