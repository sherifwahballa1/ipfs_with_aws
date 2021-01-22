/* eslint-disable object-shorthand */
const express = require("express");
// eslint-disable-next-line new-cap
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const xxs = require('xss-clean');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(helmet({
  contentSecurityPolicy: false
}));
// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use(xxs());

// set port
app.set("port", PORT);

app.use(express.static(`${__dirname }/views/dist`));


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views/dist/index.html'));
});

// redirect client
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./views/dist/index.html'));
});

const server = require("http").createServer(app);


server.listen(app.get("port"), function () {
  console.log(
    `running on port : ${app.get("port")}`
  );
});