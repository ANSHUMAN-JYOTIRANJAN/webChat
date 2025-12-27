import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../fronted/dist")))

    app.get("*",(_,res) => {
        res.sendFile(path.join(__dirname,"../fronted","dist","index.html"));
    })
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
