const mongoose = require("mongoose");

const db = `mongodb+srv://blog:GtDjVZUwzxKTD791@cluster0.deaij.mongodb.net/blog_db?retryWrites=true&w=majority`
// const db = `mongodb+srv://localhost:27017/blog_db`
const connectDB = async () =>{
    try {
        await mongoose.connect(db)
        console.log("connection successfull")
    } catch (error) {
        console.log(error)
        process.exit();
    }
}

module.exports = connectDB; 