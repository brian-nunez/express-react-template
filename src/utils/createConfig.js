import path from 'path';
import { promisify } from 'util';
import handlers from 'shortstop-handlers';
import confit from 'confit';

const ENV_SET = new Set(['e0', 'e1', 'e2', 'e3']);
const DEFAULT_ENV = 'e3';

export default function createConfig() {
  const { ENV } = process.env;

  if (!ENV_SET.has(ENV)) {
    return Promise.reject(new Error(`ENV was set to ${ENV}! It can only be one of ${[...ENV_SET]}`));
  }
  const options = {
    basedir: path.join(process.cwd(), '/config'),
    protocols: {
      file: handlers.file(path.join(process.cwd(), '/config')),
      require: handlers.require(path.join(process.cwd(), '/config')),
    },
  };

  const config = confit(options);
  config.addDefault(`${process.cwd()}/config/${DEFAULT_ENV}.json`);
  config.addOverride(`${process.cwd()}/config/${ENV}.json`);

  return promisify(config.create).call(config);
}
