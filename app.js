const express = require("express");
const cors = require("cors");

app.use(cors({
    origin: "*",
    maxAge: 600,
    credentials: true,
}))

const app = express();

app.get("/", async(req, res) => {
    const url = req.url;
    // const path = url.split("")
    const swiggyBase = "http://swiggy.com/";

    const response = await fetch(swiggyBase);
    res.json({
        message: "Data fetched succesfully",
        data: response
    })

})