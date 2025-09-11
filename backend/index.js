const express = require("express");
const connectDB = require("./db");
const rootRouter = require("./routes");
const cors = require("cors");
const { PORT } = require("./config");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
