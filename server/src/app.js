import express from "express";
import cors from "cors";
import { envConfig } from "./config/env.config.js";
import router from "./routes/index.js";
// create a server
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// listen server
app.listen(envConfig.port, () =>
  console.log(`Server is running on port ~ ${envConfig.port}`)
);
