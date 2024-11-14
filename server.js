require("dotenv").config();
const express = require("express");
const cors = require("cors");
const monggose = require("mongoose");
const productRouter = require("./src/router/product");
const uploadRouter = require("./src/router/upload");
const categoryRouter = require("./src/router/category");
const authRouter = require("./src/router/auth");

const app = express();

monggose.connect("mongodb://localhost:27017/asm");
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/api", productRouter);
app.use("/api", uploadRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
