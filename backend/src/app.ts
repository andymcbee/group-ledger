import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router as organizationRouter } from './routes/organizationRoutes';
import { router as userRouter } from './routes/userRoutes';
import { router as ledgerRouter } from './routes/ledgerRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/organization', organizationRouter);
app.use('/api/v1/ledger', ledgerRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
