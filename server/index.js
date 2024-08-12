import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { formRouter } from "./routes/formRouter.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 6004;
const app = express();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    // The client DOMAIN
    origin: ["https://finance-falcon.vercel.app/"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// ROUTER
app.use("/financial-records", formRouter);
app.use("/test", (req, res) => {
  res.send("The Test server is working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ! Connect to mongoose
mongoose.connect(process.env.DB);
mongoose.connection
  .on("error", console.error)
  .on("open", () => console.log(`Conntected to MongoDB `));
