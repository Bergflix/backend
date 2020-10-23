import * as express from "express";
import DB from "../classes/DB";
import {response} from "../misc";

const router = express.Router();

router.get("/", (req, res) => {
    DB.getMediaList("series")
        .then(data => response(req, res, 200, data))
        .catch(() => response(req, res, 404));
});

router.get("*", (req, res) => {
    DB.getMedia(req.path.substring(1))
        .then(data => response(req, res, 200, data))
        .catch(() => response(req, res, 404));
});

export default router;
