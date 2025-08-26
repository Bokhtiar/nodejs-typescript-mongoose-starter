"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path_1 = __importDefault(require("path"));
mongoose.set("strictQuery", true);
dotenv_1.default.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/** image upload */
app.use(express.json());
//app.use("/images", express.static("public/uploads"));
// Directory where images are stored
// Serve static files from the "public" directory
app.use("/public", express.static(path_1.default.join(__dirname, "..", "public")));
app.use("/api/v1", routes_1.AppRouter);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
/** DB Connection here */
mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log("Database connected"))
    .catch((error) => {
    if (error)
        console.log("Failed to connect DB");
});
