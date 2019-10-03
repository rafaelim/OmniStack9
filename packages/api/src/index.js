const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
mongoose.connect('mongodb://mongo:27017/aircnc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()  )
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.listen(5000, () => console.log("eoq ta ouvindo"))