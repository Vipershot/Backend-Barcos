const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = "mongodb+srv://back-ships20:Z8GbOOlW7U4jUWwA@cluster0.wec6tee.mongodb.net/";
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`*** CONEXION EXITOSA ***`))
    .catch((error) => console.log(error));
};

module.exports = dbConnect;
