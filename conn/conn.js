const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://admin:1111@engineeringclub.ibgsg.mongodb.net/?retryWrites=true&w=majority&appName=EngineeringClub"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log(error);
  }
};
conn();
