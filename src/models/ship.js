const mongoose = require("mongoose");

const shipScheme = new mongoose.Schema(
  {
    shipName: {
      type: String,
    },
    shipModel: {
      type: String,
    },
    shipColor: {
      type: String,
    },
    shipYear: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ship", shipScheme);
