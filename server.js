let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let multer = require("multer");
let sha1 = require("sha1");
let upload = multer({ dest: __dirname + "/uploads" });

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

let dbo = undefined;
let url =
  "mongodb+srv://saebom_shin:saebom89@cluster0-vtck9.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  dbo = db.db("Marketplace_demo1");
});

// Your endpoints go after this line
//endpoint_signup
app.post("/signup", upload.none(), async (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  //using "await", recieve username info from DB. using"findOne", find particular user.
  //if there is identical username, return false. otherwise create and store new user info.
  try {
    const user = await dbo.collection("users").findOne({ username: name });
    if (user) {
      return res.send(JSON.stringify({ success: false }));
    }
    await dbo
      .collection("users")
      .insertOne({ username: name, password: sha1(pwd) });
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("/signup", err);
    res.send(JSON.stringify({ success: false }));
  }
});
//endpoint_login
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    //posibilities of matching the right user's info.
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
    } else if (user === null) {
      res.send(JSON.stringify({ success: false }));
    } else if (user.password == sha1(pwd)) {
      res.send(JSON.stringify({ success: true }));
    } else res.send(JSON.stringify({ success: false }));
  });
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
