const express = require("express");
const urlRoute = require("./routes/urll");
const URL = require("./models/model");
const { connectMongoDb } = require("./connect");
const app = express();
const PORT = 8001;
connectMongoDb("mongodb://127.0.0.1:27017/shorturl").then(() =>
  console.log("mongodb connect")
);

app.use(express.json());
// app.get("/test", (res, req) => {
//   return res.end("<h1>wsedfrg</h1>");
// });

app.get("/:shortId", async (req, res) => {
  const shortID = req.params.shortID;
  const entery = await URL.findOneAndUpdate(
    {
      shortID,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entery.redirectURL);
});
app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`server started at port=${PORT}`));
