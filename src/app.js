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

  if ( !username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!")
  }

  globalUser = {
    username: username,
    avatar: avatar,
  }

  users.push(globalUser);
  res.status(201).send("OK");
  // console.log('globalUser aqui:', globalUser)
});



app.post("/tweets", (req, res) => {

  const {username, tweet} = req.body

  if (globalUser.username === undefined || globalUser.username === "") {
    return res.status(401).send("UNAUTHORIZED");
  }
  if ( !username || !tweet || tweet === "" ||typeof(username) !== "string" || typeof(avatar) !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!")
  }

  globalTweet = {
    username: username,
    tweet: tweet,
    avatar: globalUser.avatar
  }

    tweets.push(globalTweet);
    res.status(201).send("OK");
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
