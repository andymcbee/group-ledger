import express from 'express';
import bodyParser from 'body-parser';
import { router as organizationRouter } from './routes/organizationRoutes';

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app.use('/api/v1/user', createUser);
app.use('/api/v1/organization', organizationRouter);

console.log('Hey!');

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
