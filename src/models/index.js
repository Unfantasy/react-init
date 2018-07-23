const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const models = [];
keys.forEach((key) => {
  models.push(context(key).default || context(key));
});

export default models;
