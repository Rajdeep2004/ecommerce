import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

//configure dotenv for taking and using dotenv data on server .js
dotenv.config();

//database configuration
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api(ata dia amra website r home page thakbo and sata thaka response send korbo)
// app.get("/", (req, res) => {
//   res.send("<h1>welcome to ecommerce app</h1>");
// });

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Port(jata amra kono website k call krta pari)(evn file a ja data ta a6a port r sata amra process.env.port{akna port holo name jata env ta store a6a} )
const PORT = process.env.PORT || 8080;

//run Listen(ata r dara amara conole a port a kaj kor6a naki sata dakta pabo )
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
