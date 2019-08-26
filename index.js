const {startServer} = require('./lib');

startServer({
    httpPort: 3000,
    instanceId: 'dev',
});
