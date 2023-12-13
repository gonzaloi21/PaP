const koa = require("koa");
const KoaLogger = require("koa-logger");
const { koaBody } = require("koa-body");
const router = require("./routes.js");
const orm = require("../models/index.js");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");   

const app = new koa(); // instancia de koa

app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());

//para conectar front y backend
app.use(cors({
  origin: '*',
}));
app.use(bodyParser());

// koa-router
app.use(router.routes())

// Middleware Hola mundo!
app.use((ctx) => {
  ctx.body = "Hola mundo! Somos PAP";
});

module.exports = app;
