const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const Routes = require("./routes/userRoutes");
// const userRouter = require('./routes/userRoutes');





const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);



app.get("/api", (req, res) => {
  res.send("Welcome");
});

// app.use(Routes);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};