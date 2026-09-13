import dotenv from "dotenv";
// configure .env file
dotenv.config();


// configuring dns
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./src/app.js";
import connectDB from "./src/db/db.js";


// PORT
const PORT = process.env.PORT || 3000;


// connect to database
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is live on port: ${PORT}`);
        })
    })
    .catch((error) => console.log(error));
