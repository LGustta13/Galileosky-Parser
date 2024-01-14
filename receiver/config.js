const fs = require('fs');
const toml = require('toml'); // Certifique-se de instalar a biblioteca toml usando npm ou yarn

class Settings {
  constructor() {
    this.host = '';
    this.port = '';
    this.conLiveSec = 0; // Adicione a tradução correta para 'con_live_sec'
    this.logLevel = ''; // Adicione a tradução correta para 'log_level'
  }

  load(confPath) {
    try {
      const data = fs.readFileSync(confPath, 'utf8');
      const config = Object.assign({}, toml.parse(data));
      this.host = config.host || this.host;
      this.port = config.port || this.port;
      this.conLiveSec = config.con_live_sec || this.conLiveSec;
      this.logLevel = config.log_level || this.logLevel;
    } catch (err) {
      throw new Error(`Erro ao analisar o arquivo de configuração: ${err.message}`);
    }
  }

  getListenAddress() {
    return `${this.host}:${this.port}`;
  }

  getLogLevel() {
    switch (this.logLevel) {
      case 'DEBUG':
        return 'debug';
      case 'INFO':
        return 'info';
      case 'WARN':
        return 'warn';
      case 'ERROR':
        return 'error';
      default:
        return 'info';
    }
  }

  getEmptyConnTTL() {
    return this.conLiveSec * 1000; // Convertendo segundos para milissegundos
  }
}

module.exports = Settings;
