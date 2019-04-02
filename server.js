const http = require('http');
const port = process.env.PORT || 3600;
const app = require('./app')

const server = http.createServer(app);
server.listen(port);