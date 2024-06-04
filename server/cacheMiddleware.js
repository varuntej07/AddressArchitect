const Cache = require('node-cache');
const cache = new Cache({ stdTTL: 86400 }); // cache Time-To-Live set to 1 day 

module.exports = (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        res.send(cachedResponse);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.set(key, body);
            res.sendResponse(body);
        };
        next();
    }
};