require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const itemOrderRouter = require("./src/routes/itemOrder.routes");

const port = process.env.PORT;
const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/itemorder", itemOrderRouter);

app.listen(port, () => {
  console.log("App runing ok");
});
