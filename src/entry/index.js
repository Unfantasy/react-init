import dva from 'dva';
import models from '../models';
import router from './router';

const app = dva();

models.forEach((model) => {
  app.model(model);
});

app.router(router);

app.start('#app');
