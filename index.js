const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const connectDB = require("./config/connectDB");


// routes
const authRoutes = require("./routes/authRoutes/authRoutes");

// middleware array
const middleware = [express.json(), morgan.apply("dev"), cors()];

// use middleware 
app.use(middleware)

// use routes
app.use("/auth", authRoutes) 

// connect db
connectDB()
app.get("/", (req, res) => {
  res.send("In the name of Allah");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
