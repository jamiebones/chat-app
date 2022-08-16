import mongoose from "mongoose";

const initDataBase = async () => {
  let url = `mongodb://localhost:27017/chat_db`;
  console.log("starting database connection :");
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      keepAlive: true,
    });
    console.log("chat database connected :");
  } catch (error) {
    console.log("database error ", error);
  }
};

export default initDataBase;
