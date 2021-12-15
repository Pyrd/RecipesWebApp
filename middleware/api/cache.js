import NodeCache from "node-cache";

/**
 * Request-level in-memory cache that will hold various information for the application
 */
const CACHE = {
    authCookies: new NodeCache(),
};

export default function (req, res, next) {
    req.cache = CACHE;
    next();
};
