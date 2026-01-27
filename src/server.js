import express from "express";
import { config } from "dotenv";

//Routes Import 
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB } from "./config/db.js";

config()
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.get("/hello",(req,res)=>{
//     res.json({
//         message: 'Hello Worldss!'
//     })
// })

app.use('/movies', movieRoutes)
app.use('/auth', authRoutes)



const PORT = process.env.PORT || 5001;


const server = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

//GET, POST, PUT, DELETE
//http://localhost:5001/hello
// AUTH - signin, signup
// MOVIE - Getting All Movies
//USER - Profile
//watchlist