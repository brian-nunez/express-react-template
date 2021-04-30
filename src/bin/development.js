import http from 'http';
import _debug from 'debug';
import _app from '../app';
import normalizePort from './normalizePort';

const debug = _debug(`${process.env.npm_package_name}:server`);

(async () => {
  const app = await _app();
  const PORT = normalizePort(process.env.PORT || 5000);

  const onListen = () => {
    debug(`Listening on port ${PORT}`);
  };

  const server = http.createServer(app);

  server.listen(PORT, onListen);
})();
