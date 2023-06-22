import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

const users = []
const tweets = []
let avatare = ""

app.post('/sign-up', (req, res) => {
    const user = req.body;
    avatare = user.avatar
    users.push(user)
    res.send("OK")
})

console.log("users aqui:", users)

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/tweets", (req, res) => {
    const tweet = req.body
    let neww = {...tweet, avatar: avatare}
    tweets.push(neww)
    res.send("OK")

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`));
