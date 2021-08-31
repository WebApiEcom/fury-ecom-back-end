const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const OrderRouter = require("./routes/orders");
const admin = require("./routes/admin");
const usersRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const client = require("./routes/client");



// CREATE EXPRESS SERVER
const app = express();

// ADD MIDDLEWARES
app.use(cors());
app.use(express.json());

// APP ROUTES
app.use("/fury/orders", OrderRouter);
app.use("/fury/admin", admin);
app.use("/fury/users", usersRoutes); // Users Routes
app.use("/furycontact", contactRoutes); // Contacts Routes
app.use("/fury/client", client);

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("Getting error with: ", err));

// DEFINE PORT
app.listen(4000, () => {
  console.log("sever running on port 4000");
});
