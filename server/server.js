// configuring dns
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";


// configure .env file
dotenv.config();


// PORT
const PORT = process.env.PORT;


// connect to database
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is live on port: ${PORT}`);
        })
    })
    .catch((error) => console.log(error));
