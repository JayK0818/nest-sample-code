const Koa = require('koa')
const mongoose = require('mongoose')
const router = require('koa-router')();

const app = new Koa();

mongoose.connect('mongodb://127.0.0.1:27017');

/**
 * @description schema
 */
const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});

/**
 * @description model
 */
const Account = mongoose.model('account', AccountSchema);

router.get('/api/account/create', async (ctx) => {
  const account = new Account({ username: 'kyrie', password: '123455' });
  await account.save();
  ctx.body = {
    code: 0,
    msg: 'success',
  };
});

app.use(router.routes());

app.listen(3001, () => {
  console.log('app starting at port 3001');
});
