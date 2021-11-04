const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/Users");

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));
// applicatioin/json 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 안녕안녕");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/register", (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 데이터 베이스에 저장한다.
  const user = new User(req.body);
  // save()는 mongoDB의 메소드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
