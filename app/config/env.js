const { PICPAY_ENVIRONMENT } = process.env;

const parsedEnv = require("dotenv-flow").config({
  node_env: PICPAY_ENVIRONMENT,
}).parsed;

module.exports = parsedEnv;
