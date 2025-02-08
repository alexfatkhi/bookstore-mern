import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    console.log("okeeeee mantaapppppp")
    return response.status(234).send('Welcome to MERN Stack Tutorial')
})

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
});