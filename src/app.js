require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
const dbConnect = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));
const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Tu app esta lista por el puerto ${port}`);
});

dbConnect();
