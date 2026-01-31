import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";

//routes
// import authRoutes from "./routes/auth.router";
import enquiryRoutes from "./routes/enquiry.router";
import otpRoutes from "./routes/otp.router";
import blogRoutes from "./routes/blog.router";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsConfig = {
  origin: function (origin: any, callback: any) {
    const allowedOrigins = process.env.CORS?.split(",");
    if (allowedOrigins!.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsConfig));

// app.use("/api/auth", authRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome" });
});

app.use((res, req, next) => {
  const error: any = new Error("Route not found.");
  error.status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error", status: false });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
