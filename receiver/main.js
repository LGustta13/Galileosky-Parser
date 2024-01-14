// Files
const runServer = require('./server.js');
const Settings = require('./config.js');
const loggerCreate = require('./logger.js');

function main() {

    const config = new Settings();
    const logger = loggerCreate(config);

    if (process.argv.length === 2) {
        // const configPath = process.argv[2];
        const configPath = 'configs/receiver.toml';

        if (config.load(configPath) === null) {
          logger.error('Erro ao analisar a configuração');
          return;
        }
    } else {
        logger.error('O caminho para a configuração não foi especificado');
        return;
    }
    
    runServer(logger, config.getListenAddress(), config.getEmptyConnTTL());
}

module.exports = main