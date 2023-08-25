import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// MONGO_URL=mongodb+srv://Nandu:9GNwcenrIsSmdMtf@cluster0.rl2kiej.mongodb.net/?retryWrites=true&w=majority


// Routes
import user_route from "./Routes/User.js";

dotenv.config();
const app = express();

/* Middleware*/
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use(cors());
app.disable("x-powered-by");  //To hide backend stack from the hacker's



// /* ROUTES */
app.use("/api/v1/outfit", user_route);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
