import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRoutes from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const allowedOrigins = process.env.CLIENT_URL?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

await connectCloudinary();

if (process.env.VERCEL && !allowedOrigins?.length) {
  throw new Error("Set CLIENT_URL to the deployed client origin.");
}

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

app.use((error, req, res, next) => {
  console.error("Request failed", error);

  if (res.headersSent) {
    return next(error);
  }

  const status =
    error.code === "LIMIT_FILE_SIZE"
      ? 413
      : Number.isInteger(error.status) && error.status >= 400
        ? error.status
        : 500;
  const message =
    status === 413
      ? "Uploaded file exceeds the 4 MB limit."
      : status < 500
        ? "Invalid request."
        : "Request could not be processed. Please try again.";

  return res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
