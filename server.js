import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./lib/mongodb.js";
import authRoute from "./routes/auth/route.js";
import inspectorRoute from "./routes/inspector/route.js";
import reportRoute from "./routes/report/route.js";
import overviewRoute from "./routes/overview/route.js";

const app = express();
const PORT = process.env.PORT || 9000;

// connect db
connectDatabase();

app.use(
  cors({
    origin: [
      process.env.CORS_ALLOWED_ORIGIN_DASHBOARD,
      process.env.CORS_ALLOWED_ORIGIN_APP,
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());


// Routes
app.use("/api/auth", authRoute);
app.use("/api/inspector", inspectorRoute);
app.use("/api/report", reportRoute);
app.use("/api/overview", overviewRoute);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
