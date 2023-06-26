import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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

function obterElementosPorPagina(pagina) {
  const indiceInicial = (pagina - 1) * 10;
  const indiceFinal = indiceInicial + 10;

  return tweets.slice(indiceInicial, indiceFinal);
}

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

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  // console.log(JSON.stringify(req.headers.user));
  const { user } = req.headers;

  globalTweet = {
    username: user,
    tweet: tweet,
    avatar: globalUser.avatar,
  };

  if (!tweet || typeof tweet !== "string" || tweet === "") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  if (!user || user === undefined || user === "") {
    return res.status(401).send("UNAUTHORIZED");
  }

  tweets.push(globalTweet);
  res.status(201).send("OK");
});

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
      const elementosPagina = obterElementosPorPagina(page);
      res.send(elementosPagina);
      return;
    }
  }

  if (tweets.length <= 10) {
    return res.send(tweets);
  }

  res.send(tweets.slice(-10));
});

app.get("/tweets/:USERNAME", (req, res) => {
  const { USERNAME } = req.params;

  const tweetsUsername = tweets.filter((item) => item.username === USERNAME);

  if (tweetsUsername.length !== 0) {
    res.send(tweetsUsername);
  } else {
    res.send(tweetsUsername);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
