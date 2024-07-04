const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
};
app.use(cors(corsOptions));

const dataRoutes = require("./router/router.js");
app.use("/", dataRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Running at Port 3000");
});
