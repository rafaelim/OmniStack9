const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
mongoose.connect('mongodb://mongo:27017/aircnc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json()  )
app.use(routes);

app.listen(3000, () => console.log("ta ouvindo"))