const express = require("express");
const errorHandler = require("./middleware/errorHandler")
const dorenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); //In built Express parser
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});