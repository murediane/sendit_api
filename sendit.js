const parcel = require("./routes/parcels");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/V1/parcels", parcel);
app.set("View engine", "pug");
app.set("Views", "./views");

app.get("/", function(req, res) {
  res.render("index.pug", { title: "my sendit app", message: "hello there" });
});

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listerning on port ${port}....`));
