// const mongoose = require("mongoose");

// const connect = () => {
//   try {
//     //  mongoose.connect(process.env.MONGO,{autoIndex:true});
//     mongoose
//       .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log("db Connected"));
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connect;


const mongoose = require("mongoose");

const connect = () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.ATLAS_URI;

    if (!mongoUri) {
      throw new Error("No MongoDB URI provided in env (MONGO_URI or ATLAS_URI)");
    }

    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("MongoDB connection error:", err));
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

module.exports = connect;
