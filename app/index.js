const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.use(bodyParser.json())


app.post('/mine',(req,res)=>{
    const block = bc.addBock(req.body.data)
    console.log(`New Block added ${block.toString()}`)

    res.redirect('/blocks')
})
app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`listening on port ${HTTP_PORT}`));
