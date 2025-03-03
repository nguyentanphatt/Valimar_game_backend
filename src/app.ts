import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";
import requirementRoutes from "./routes/requirementRoutes";
import screenshotsRoutes from "./routes/screenshotRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import promocodeRoutes from "./routes/promocodeRoutes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin:
      "https://valimar-e-commerce-mcbpnk3vd-phats-projects-09db390c.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// ✅ Prevent Caching Issues
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});
app.use("/games", gameRoutes);
app.use("/requirements", requirementRoutes);
app.use("/screenshots", screenshotsRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/promocode", promocodeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npx ts-node app.ts
