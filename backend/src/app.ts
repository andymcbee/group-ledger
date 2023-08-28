import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router as organizationCreationRouter } from './routes/organizationCreationRoutes';
import { router as organizationRouter } from './routes/organizationRoutes';
import { router as userRouter } from './routes/userRoutes';
import { router as ledgerRouter } from './routes/ledgerRoutes';
import { userAuth } from './services/middleware/userAuth';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/organization', organizationCreationRouter); //public
app.use('/api/v1/organization/:organizationId', userAuth, organizationRouter); // all org-specific resource access/modification lives here
app.use('/api/v1/ledger', ledgerRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
