import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];
let _avatar = "";
let _username = "";

app.post("/sign-up", (req, res) => {
  const user = req.body;
  _avatar = user.avatar;
  users.push(user);
  res.send("OK");
});

console.log("users aqui:", users);

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  _username = tweet.username;

  if (_username === undefined || _username === "") {
    console.log("UNAUTHORIZED");
  } else {
    let tweetWithAvatar = { ...tweet, avatar: _avatar };
    tweets.push(tweetWithAvatar);
    res.send("OK");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
