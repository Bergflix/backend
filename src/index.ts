import * as cors from 'cors';
import * as express from 'express';
import { response } from './misc';

import mediaRoute from './ressources/media';
import moviesRoute from './ressources/movies';
import seriesRoute from './ressources/series';
import usersRoute from './ressources/users';

// Create express instance and apply cors-restriction
const app = express();
app.use(cors());

// Apply given routers
app.use("/media", mediaRoute);
app.use("/movies", moviesRoute);
app.use("/series", seriesRoute);
app.use("/users", usersRoute);

// Catch all other request to not run into an error
app.all('/', (req, res) => response(req, res, 200, 'Welcome to the backend of bergflix! :)'));
app.all('*', (req, res) => response(req, res, 404));


// Default export app
export default app;
