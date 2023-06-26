import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Global Variables:

const users = [];
const tweets = [];

let globalUser = {
  username: "",
  avatar: "",
};

let globalTweet = {
  username: "",
  tweet: "",
};


// Function to separate elements of the array of tweets 
// according to the page passed:

function elementsPerPage(thepage) {
  const initialIndex = (thepage - 1) * 10;
  const finalIndex = initialIndex + 10;

  return tweets.slice(initialIndex, finalIndex);
}


// Sign Up - POST:

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (
    !username ||
    !avatar ||
    typeof username !== "string" ||
    typeof avatar !== "string"
  ) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  globalUser = {
    username: username,
    avatar: avatar,
  };

  users.push(globalUser);
  res.status(201).send("OK");
});


// Tweets - POST:

app.post("/tweets", (req, res) => {

  const { tweet } = req.body;

  const { user } = req.headers;

  const userExists = users.find(u => u.username === user);

  globalTweet = {
    username: user,
    tweet: tweet,
    avatar: globalUser.avatar,
  };

  if (!tweet || typeof tweet !== "string" || tweet === "") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  if (!userExists || user === undefined || user === "") {
    return res.status(401).send("UNAUTHORIZED");
  }

  tweets.push(globalTweet);
  res.status(201).send("OK");
});


// Tweets - GET:

app.get("/tweets", (req, res) => {
  let page = Number(req.query.page);

  if (page) {
    if (
      page === 0 ||
      page === undefined ||
      typeof page !== "number" ||
      page < 1
    ) {
      return res.status(400).send("Informe uma página válida!");
    } else {
      const elementsPage = elementsPerPage(page);
      res.send(elementsPage);
      return;
    }
  }

  if (tweets.length <= 10) {
    return res.send(tweets);
  }

  res.send(tweets.slice(-10));
});


// Tweets - GET by :USERNAME:

app.get("/tweets/:USERNAME", (req, res) => {
  const { USERNAME } = req.params;

  const tweetsUsername = tweets.filter((item) => item.username === USERNAME);

  if (tweetsUsername.length !== 0) {
    res.send(tweetsUsername);
  } else {
    res.send(tweetsUsername);
  }
});


// PORT 5000:

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
