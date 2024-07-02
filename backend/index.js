const { PORT } = require("./configs");

const cors = require("cors");
const express = require("express");

const router = require("./routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);

app.listen(PORT, () => console.log(`App started at PORT  ${PORT}🚀`));
