const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL, { serverSelectionTimeoutMS: 5000 });
    console.log(`[${new Date().toISOString()}] ✅ Database connected: ${connect.connection.name}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ MongoDB connection error:`, err);
    process.exit(1);
  }
};

module.exports = connectDb;
