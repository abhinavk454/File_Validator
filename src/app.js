const express = require("express");
const app = express();
const multer = require("multer");
const appRouter = require("./routers/endpoints");

app.use(express.json());
app.use(appRouter);

module.exports = app;
