import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    maxAge: 600,
    credentials: true,
}));

app.get("/restaurant", async (req, res) => {
    try {
        const fetch = (await import("node-fetch")).default; // Dynamic Import

        const swiggyBase = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

        const response = await fetch(swiggyBase, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            }
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();

        res.json({
            message: "Data fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});


app.get("/menu", async (req, res) => {
    try {
        const resId = req.query.resId; // Correct way to extract resId
        if (!resId) {
            return res.status(400).json({ message: "Missing resId parameter" });
        }

        console.log("Fetching menu for Restaurant ID:", resId);

        const fetch = (await import("node-fetch")).default; // Dynamic Import
        const swiggyBase = `https://swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=31.2195994&lng=75.7633405&restaurantId=${resId}`;

        const response = await fetch(swiggyBase, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            },
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();

        res.json({
            message: "Data fetched successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});



app.listen(7777, () => {
    console.log("Server is running on port 7777");
});
