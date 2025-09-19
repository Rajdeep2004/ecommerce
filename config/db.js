import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`CONNECTION TO DB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongooDB ${error}`);
  }
};

export default connectDB;

// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`Server Running on PORT ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
