module.exports = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, application, x-datadog-trace-id, x-datadog-parent-id, x-datadog-origin, x-datadog-sampling-priority, x-datadog-sampled');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === "OPTIONS") {
        res.status(200);
        res.end();
    } else {
        next();
    }
};
