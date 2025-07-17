import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDb from "./src/config/database.js";
import router from "./src/routes/user.routes.js";

const app = express();

// Connect to MongoDB
connectDb();


//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


//routes
// app.get("/", (req, res)=>{
//     res.send("hello jee")
// })
app.use('/api/auth', router);



//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(` Server listening on http://localhost:${PORT}`);
  }
});