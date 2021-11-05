require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { config } = require('./config');

const app = new Koa();

app.use(errorMiddleware);
app.use(cors({ credentials: true, exposeHeaders: '*' }));
app.use(bodyParser());
app.use(router.routes());

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
