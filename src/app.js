const koa = require('koa');
const koaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes.js');
const orm = require('./models');

const app = new koa();

app.context.orm = orm;

// Para acceder del frontend
app.use(cors());

// Middlewares de koa
app.use(koaLogger());
app.use(koaBody());

// Koa-Router
app.use(router.routes());

module.exports = app;
