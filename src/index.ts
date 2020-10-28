import * as cors from 'cors';
import * as express from 'express';
import { response } from './misc';

import mediaRoute from './ressources/media';
import moviesRoute from './ressources/movies';
import seriesRoute from './ressources/series';
import usersRoute from './ressources/users';

function wrap(router: express.Router): express.Express {
    // Create new express instance and apply cors-restriction
    const app = express();
    app.use(cors({ origin: true }))

    // Apply given router
    app.use("/", router);

    // Catch all other request to not run into an error
    app.all('/', (req, res) => response(req, res, 200, 'Welcome to the backend of bergflix! :)'));
    app.all('*', (req, res) => response(req, res, 404));

    // Return the express instance
    return app;
}

// Single exports
export let mediaApp = wrap(mediaRoute);
export let moviesApp = wrap(moviesRoute);
export let seriesApp = wrap(seriesRoute);
export let usersApp = wrap(usersRoute);

// Default export
export default wrap(express.Router());
