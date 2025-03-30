import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
