import express from "express";
import {nanoid} from "nanoid"
import dotenv from "dotenv"

import short_url from "./routes/short_url.route.js"
import user_routes from "./routes/user.routes.js"
import auth_routes from "./routes/auth.routes.js"
import { redirectFromShortUrl } from "./controllers/short_url.controller.js";
import { errorHandler } from "./utils/errorHandler.js";
import { attachUser } from "./utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173', // your React app
//     credentials: true // 👈 this allows cookies to be sent
// }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)
 
export default app