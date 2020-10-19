import * as cors from "cors";
import * as express from "express";
import {response} from "./misc";

import media from "./ressources/media";
import movies from "./ressources/movies";
import series from "./ressources/series";
import users from "./ressources/users";

cors({ origin: true });
const app = express();

app.use("/media", media);
app.use("/movies", movies);
app.use("/series", series);
app.use("/users", users);

app.all("/", (req, res) => response(req, res, 200, "Welcome to the src of bergflix :)"));
app.all("*", (req, res) => response(req, res, 404));

export default app;
