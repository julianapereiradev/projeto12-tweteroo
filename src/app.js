import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

let globalUser = {
  username: "",
  avatar: ""
}

let globalTweet = {
  username: "",
  tweet: ""
}

app.post("/sign-up", (req, res) => {
  const {username, avatar} = req.body

  globalUser = {
    username: username,
    avatar: avatar,
  }

  users.push(globalUser);
  res.send("OK");
  // console.log('globalUser aqui:', globalUser)
});



app.post("/tweets", (req, res) => {

  const {username, tweet} = req.body

  globalTweet = {
    username: username,
    tweet: tweet,
    avatar: globalUser.avatar
  }

  if (username === undefined || username === "") {
    res.status(401).send("UNAUTHORIZED");
  } else {
    tweets.push(globalTweet);
    res.send("OK");
  }
});

app.get("/tweets", (req, res) => {
  if (tweets.length <= 10) {
    res.send(tweets);
  } else {
    res.send(tweets.slice(-10));
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
