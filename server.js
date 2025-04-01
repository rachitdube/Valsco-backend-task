import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";

dotenv.config();

//app initializationd:\Vidit
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("src/public"));
app.use(
  cors({
    origin: "*",
  })
);

//api endpoints
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRoutes);

//db connection
(async () => {
  try {
    app.listen(port, (req, res) => {
      console.log(`server is running on port ${port}`);
    });

    await mongoose
      .connect(`${process.env.MONGO_URI}`)
      .then(() => console.log("connected to mongoDB"));

    app.on("error", () => {
      console.log("error connecting to DataBase");
      throw error;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
